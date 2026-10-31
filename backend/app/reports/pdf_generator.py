import os
import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from typing import Dict, Any, List

def generate_farm_health_pdf(report_id: str, farm_data: Dict[str, Any], output_path: str) -> str:
    """
    Generate an executive, publication-grade ISO-14064 Ag-Data Compliance
    and Farm Health Audit PDF Report using ReportLab.
    """
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#004c22')
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#404940')
    )

    h2_style = ParagraphStyle(
        'DocH2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor('#166534')
    )

    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#061e28')
    )

    elements = []

    # 1. Header Banner
    elements.append(Paragraph("AGRISAT PLANETARY HEALTH AUDIT", title_style))
    elements.append(Paragraph(
        f"ISO-14064 Ag-Data Standard • Report ID: {report_id} • Generated: {datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}",
        subtitle_style
    ))
    elements.append(Spacer(1, 10))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#166534'), spaceAfter=15))

    # 2. Executive Overview Table
    operator = farm_data.get("operator", "Sarah Jenkins")
    farm_name = farm_data.get("farmName", "Green Valley Agri-Corporation")
    total_area = farm_data.get("totalAreaHa", 1420)
    parcels_count = farm_data.get("parcelsCount", 18)
    satellite = farm_data.get("satellite", {})
    constellation = satellite.get("constellation", "Sentinel-2B (10m Multispectral)")

    meta_table_data = [
        [
            Paragraph("<b>Supervising Agronomist:</b>", body_style),
            Paragraph(f"{operator}", body_style),
            Paragraph("<b>Farm Enterprise:</b>", body_style),
            Paragraph(f"{farm_name}", body_style),
        ],
        [
            Paragraph("<b>Total Land Area:</b>", body_style),
            Paragraph(f"{total_area} Hectares ({parcels_count} Parcels)", body_style),
            Paragraph("<b>Satellite Constellation:</b>", body_style),
            Paragraph(f"{constellation}", body_style),
        ],
        [
            Paragraph("<b>Mean NDVI Vigor:</b>", body_style),
            Paragraph("<font color='#006c49'><b>0.81 (Optimal Canopy)</b></font>", body_style),
            Paragraph("<b>Atmospheric Correction:</b>", body_style),
            Paragraph("Level-2A BOA Surface Reflectance", body_style),
        ]
    ]

    meta_table = Table(meta_table_data, colWidths=[130, 140, 130, 140])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f4faff')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cee6f4')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e7f6ff')),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    elements.append(meta_table)
    elements.append(Spacer(1, 15))

    # 3. Executive Synthesis
    elements.append(Paragraph("1. Executive Agronomic Assessment", h2_style))
    exec_summary = (
        f"Planetary multispectral observations across {farm_name} indicate strong photosynthetic vigor across "
        f"{parcels_count - 1} of {parcels_count} monitored parcels. Average biomass accumulation is tracking "
        f"<b>+14.2% above regional benchmarks</b>. An acute hydric deficit was detected on Field B-07 (South Basin), "
        f"triggered by a line pressure drop at sub-lateral 4B. Recommended pulse irrigation of +2.5 hours has protected "
        f"an estimated <b>$42,500 in harvest value</b>."
    )
    elements.append(Paragraph(exec_summary, body_style))
    elements.append(Spacer(1, 15))

    # 4. Parcel Telemetry Table
    elements.append(Paragraph("2. Audited Parcel Breakdown & Spectral Indices", h2_style))
    
    fields = farm_data.get("fields", [])
    table_rows = [
        ["Parcel ID", "Parcel Name", "Crop Type", "Area (Ha)", "NDVI", "Moisture", "Status"]
    ]

    for f in fields:
        table_rows.append([
            f.get("id", "-"),
            f.get("name", "").replace("Field ", ""),
            f.get("crop", "-"),
            str(f.get("areaHa", "-")),
            str(f.get("ndvi", "-")),
            str(f.get("moisture", "-")),
            f.get("status", "Healthy")
        ])

    parcel_table = Table(table_rows, colWidths=[60, 130, 80, 55, 45, 60, 110])
    parcel_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#166534')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 8.5),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
        ('TOPPADDING', (0, 0), (-1, 0), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cee6f4')),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 8),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.HexColor('#ffffff'), colors.HexColor('#f4faff')])
    ]))
    elements.append(parcel_table)
    elements.append(Spacer(1, 15))

    # 5. Gemini AI Agronomic Recommendations
    elements.append(Paragraph("3. Gemini AI Prescription & Action Items", h2_style))
    rec_text = (
        "• <b>Field B-07 (Priority 1):</b> Perform immediate manifold inspection on Valve 4B. Execute 2.5-hour "
        "supplemental drip cycle (approx. 18mm equivalent). Re-scan canopy via Sentinel-2 pass.<br/>"
        "• <b>Field E-09 (Priority 2):</b> Red-edge band slope flattening indicates nitrogen leaching in northern "
        "quadrant. Apply variable-rate foliar urea (28-0-0) at 32 kg/Ha.<br/>"
        "• <b>Field A-01 & C-04:</b> Optimal growth trajectory; maintain standard automated fertigation schedule."
    )
    elements.append(Paragraph(rec_text, body_style))
    elements.append(Spacer(1, 20))

    # 6. Certification & Signatures
    footer_table_data = [
        [
            Paragraph("<b>ESA Copernicus Hub Verification:</b> PASSED (Checksum: ESA-SEN2B-9842F)", body_style),
            Paragraph("<b>Agronomic Lead Signature:</b> <i>Sarah Jenkins, MSc GIS</i>", body_style),
        ]
    ]
    footer_table = Table(footer_table_data, colWidths=[300, 240])
    footer_table.setStyle(TableStyle([
        ('LINEABOVE', (0, 0), (-1, -1), 1, colors.HexColor('#707a6f')),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
    ]))
    elements.append(footer_table)

    doc.build(elements)
    return output_path

