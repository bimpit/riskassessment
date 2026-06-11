import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
} from 'docx'
import { getRiskLevel } from './risk-scoring'

export async function generateRiskRegisterDocx(
  assessmentTitle: string,
  risks: Array<{
    title: string
    description: string | null
    likelihood: number
    consequence: number
    risk_score: number
    owner: string | null
    status: string
  }>
): Promise<Uint8Array<ArrayBuffer>> {
  const rows: TableRow[] = [
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph('Risk')] }),
        new TableCell({ children: [new Paragraph('Description')] }),
        new TableCell({ children: [new Paragraph('L')] }),
        new TableCell({ children: [new Paragraph('C')] }),
        new TableCell({ children: [new Paragraph('Score')] }),
        new TableCell({ children: [new Paragraph('Owner')] }),
        new TableCell({ children: [new Paragraph('Status')] }),
      ],
    }),
  ]

  risks.forEach((risk) => {
    const level = getRiskLevel(risk.risk_score)
    rows.push(
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(risk.title)] }),
          new TableCell({ children: [new Paragraph(risk.description || '')] }),
          new TableCell({ children: [new Paragraph(String(risk.likelihood))] }),
          new TableCell({ children: [new Paragraph(String(risk.consequence))] }),
          new TableCell({ children: [new Paragraph(`${risk.risk_score} (${level})`)] }),
          new TableCell({ children: [new Paragraph(risk.owner || 'Unassigned')] }),
          new TableCell({ children: [new Paragraph(risk.status)] }),
        ],
      })
    )
  })

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: assessmentTitle,
            heading: 'Heading1' as any,
            thematicBreak: false,
          }),
          new Paragraph({
            text: 'Risk Register',
            heading: 'Heading2' as any,
          }),
          new Paragraph('Generated: ' + new Date().toLocaleDateString()),
          new Paragraph(''),
          new Table({
            rows,
          }),
        ],
      },
    ],
  })

  return new Uint8Array(await Packer.toBuffer(doc)) as Uint8Array<ArrayBuffer>
}
