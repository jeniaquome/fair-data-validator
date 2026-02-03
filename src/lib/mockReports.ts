import { ValidationResult, DataType } from './validator'

export interface SavedReport {
  id: string
  title: string
  dataType: DataType
  researcher: string
  sampleId: string
  organism: string
  experimentType: string
  submittedAt: string
  validationResult: ValidationResult
  status: 'compliant' | 'non-compliant' | 'pending-review'
}

export const mockReports: SavedReport[] = [
  {
    id: 'RPT-2026-001',
    title: 'Single-cell RNA-seq analysis of tumor microenvironment',
    dataType: 'genomics',
    researcher: 'Dr. Sarah Chen',
    sampleId: 'GNE-20260128-001',
    organism: 'Homo sapiens',
    experimentType: 'Single-cell RNA-seq',
    submittedAt: '2026-01-28T14:30:00Z',
    status: 'compliant',
    validationResult: {
      isValid: true,
      score: 138,
      maxScore: 160,
      issues: [
        {
          field: 'equipment',
          severity: 'info',
          message: 'Equipment information helps reproducibility',
          suggestion: 'List key instruments and their model numbers',
          fairPrinciple: 'R',
        },
      ],
      fairScores: {
        findable: 95,
        accessible: 100,
        interoperable: 85,
        reusable: 88,
      },
    },
  },
  {
    id: 'RPT-2026-002',
    title: 'CRISPR knockout screen for drug resistance markers',
    dataType: 'genomics',
    researcher: 'Dr. Michael Torres',
    sampleId: 'GNE-20260125-003',
    organism: 'Homo sapiens',
    experimentType: 'CRISPR Screen',
    submittedAt: '2026-01-25T09:15:00Z',
    status: 'compliant',
    validationResult: {
      isValid: true,
      score: 145,
      maxScore: 160,
      issues: [],
      fairScores: {
        findable: 100,
        accessible: 92,
        interoperable: 90,
        reusable: 95,
      },
    },
  },
  {
    id: 'RPT-2026-003',
    title: 'Pharmacokinetics study of GNE-4820 in mouse model',
    dataType: 'in_vivo',
    researcher: 'Dr. Emily Watson',
    sampleId: 'INV-20260120-007',
    organism: 'Mus musculus',
    experimentType: 'Pharmacokinetics',
    submittedAt: '2026-01-20T16:45:00Z',
    status: 'non-compliant',
    validationResult: {
      isValid: false,
      score: 85,
      maxScore: 160,
      issues: [
        {
          field: 'protocol',
          severity: 'error',
          message: 'Detailed protocol is required for reusability',
          fairPrinciple: 'R',
        },
        {
          field: 'rawDataLocation',
          severity: 'warning',
          message: 'Raw data location not specified',
          suggestion: 'Provide a path or URI to the raw data for accessibility',
          fairPrinciple: 'A',
        },
        {
          field: 'chemicalCompounds',
          severity: 'warning',
          message: 'Compound and dosage information improves reproducibility',
          suggestion: 'Include compound names and dosages used in the study',
          fairPrinciple: 'R',
        },
      ],
      fairScores: {
        findable: 78,
        accessible: 40,
        interoperable: 65,
        reusable: 35,
      },
    },
  },
  {
    id: 'RPT-2026-004',
    title: 'Spatial transcriptomics of liver metastasis',
    dataType: 'genomics',
    researcher: 'Dr. James Liu',
    sampleId: 'GNE-20260118-012',
    organism: 'Homo sapiens',
    experimentType: 'Spatial Transcriptomics',
    submittedAt: '2026-01-18T11:20:00Z',
    status: 'compliant',
    validationResult: {
      isValid: true,
      score: 142,
      maxScore: 160,
      issues: [
        {
          field: 'geneId',
          severity: 'info',
          message: 'Consider adding a standardized Gene ID',
          suggestion: 'Gene symbols can be ambiguous; add Ensembl or NCBI ID for interoperability',
          fairPrinciple: 'I',
        },
      ],
      fairScores: {
        findable: 92,
        accessible: 96,
        interoperable: 82,
        reusable: 92,
      },
    },
  },
  {
    id: 'RPT-2026-005',
    title: 'Toxicology assessment of novel kinase inhibitor',
    dataType: 'in_vivo',
    researcher: 'Dr. Rachel Kim',
    sampleId: 'INV-20260115-002',
    organism: 'Rattus norvegicus',
    experimentType: 'Toxicology Study',
    submittedAt: '2026-01-15T08:00:00Z',
    status: 'pending-review',
    validationResult: {
      isValid: true,
      score: 118,
      maxScore: 160,
      issues: [
        {
          field: 'tissueType',
          severity: 'warning',
          message: 'Tissue type not in standard ontology (UBERON)',
          suggestion: 'Standard tissues: liver, brain, heart, kidney, lung, blood, skin, muscle',
          fairPrinciple: 'I',
        },
        {
          field: 'keywords',
          severity: 'warning',
          message: 'Add more keywords for better discoverability',
          suggestion: 'Include at least 3 relevant keywords (comma-separated)',
          fairPrinciple: 'F',
        },
      ],
      fairScores: {
        findable: 72,
        accessible: 88,
        interoperable: 70,
        reusable: 80,
      },
    },
  },
  {
    id: 'RPT-2026-006',
    title: 'ChIP-seq analysis of enhancer landscape in iPSC differentiation',
    dataType: 'genomics',
    researcher: 'Dr. Anna Petrova',
    sampleId: 'GNE-20260112-008',
    organism: 'Homo sapiens',
    experimentType: 'ChIP-seq',
    submittedAt: '2026-01-12T13:30:00Z',
    status: 'compliant',
    validationResult: {
      isValid: true,
      score: 152,
      maxScore: 160,
      issues: [],
      fairScores: {
        findable: 98,
        accessible: 96,
        interoperable: 94,
        reusable: 96,
      },
    },
  },
  {
    id: 'RPT-2026-007',
    title: 'Western blot validation of PROTAC degradation targets',
    dataType: 'general',
    researcher: 'Dr. David Park',
    sampleId: 'EXP-20260110-004',
    organism: 'Homo sapiens',
    experimentType: 'Western Blot',
    submittedAt: '2026-01-10T10:45:00Z',
    status: 'non-compliant',
    validationResult: {
      isValid: false,
      score: 72,
      maxScore: 160,
      issues: [
        {
          field: 'description',
          severity: 'error',
          message: 'Description is required and should be comprehensive',
          fairPrinciple: 'F',
        },
        {
          field: 'protocol',
          severity: 'error',
          message: 'Detailed protocol is required for reusability',
          fairPrinciple: 'R',
        },
        {
          field: 'sampleId',
          severity: 'warning',
          message: 'Sample ID does not follow standard format',
          suggestion: 'Use format: PREFIX-YYYYMMDD-NNN (e.g., EXP-20260201-001)',
          fairPrinciple: 'F',
        },
      ],
      fairScores: {
        findable: 55,
        accessible: 60,
        interoperable: 50,
        reusable: 30,
      },
    },
  },
  {
    id: 'RPT-2026-008',
    title: 'Biodistribution study of antibody-drug conjugate',
    dataType: 'in_vivo',
    researcher: 'Dr. Lisa Nguyen',
    sampleId: 'INV-20260108-001',
    organism: 'Mus musculus',
    experimentType: 'Biodistribution',
    submittedAt: '2026-01-08T15:20:00Z',
    status: 'compliant',
    validationResult: {
      isValid: true,
      score: 135,
      maxScore: 160,
      issues: [
        {
          field: 'dataFormat',
          severity: 'info',
          message: 'Consider using a standard data format',
          suggestion: 'Standard formats: FASTQ, BAM, VCF, CSV, TSV, JSON, HDF5, DICOM',
          fairPrinciple: 'I',
        },
      ],
      fairScores: {
        findable: 90,
        accessible: 88,
        interoperable: 78,
        reusable: 90,
      },
    },
  },
  {
    id: 'RPT-2026-009',
    title: 'Flow cytometry analysis of CAR-T cell phenotypes',
    dataType: 'general',
    researcher: 'Dr. Robert Martinez',
    sampleId: 'EXP-20260105-009',
    organism: 'Homo sapiens',
    experimentType: 'Flow Cytometry',
    submittedAt: '2026-01-05T09:00:00Z',
    status: 'pending-review',
    validationResult: {
      isValid: true,
      score: 122,
      maxScore: 160,
      issues: [
        {
          field: 'rawDataLocation',
          severity: 'info',
          message: 'Consider using a persistent cloud storage URI',
          suggestion: 'Use s3://, gs://, or https:// URIs for better accessibility',
          fairPrinciple: 'A',
        },
        {
          field: 'experimentType',
          severity: 'info',
          message: 'Experiment type not in standard list',
          suggestion: 'Consider using: Western Blot, ELISA, Flow Cytometry, Microscopy',
          fairPrinciple: 'I',
        },
      ],
      fairScores: {
        findable: 85,
        accessible: 75,
        interoperable: 72,
        reusable: 82,
      },
    },
  },
  {
    id: 'RPT-2026-010',
    title: 'ATAC-seq profiling of treatment-resistant melanoma',
    dataType: 'genomics',
    researcher: 'Dr. Sarah Chen',
    sampleId: 'GNE-20260102-005',
    organism: 'Homo sapiens',
    experimentType: 'ATAC-seq',
    submittedAt: '2026-01-02T14:00:00Z',
    status: 'compliant',
    validationResult: {
      isValid: true,
      score: 148,
      maxScore: 160,
      issues: [],
      fairScores: {
        findable: 95,
        accessible: 94,
        interoperable: 92,
        reusable: 94,
      },
    },
  },
]

export function getReportStats(reports: SavedReport[]) {
  const total = reports.length
  const compliant = reports.filter(r => r.status === 'compliant').length
  const nonCompliant = reports.filter(r => r.status === 'non-compliant').length
  const pendingReview = reports.filter(r => r.status === 'pending-review').length

  const avgScore = reports.reduce((sum, r) => sum + (r.validationResult.score / r.validationResult.maxScore) * 100, 0) / total

  const avgFairScores = {
    findable: Math.round(reports.reduce((sum, r) => sum + r.validationResult.fairScores.findable, 0) / total),
    accessible: Math.round(reports.reduce((sum, r) => sum + r.validationResult.fairScores.accessible, 0) / total),
    interoperable: Math.round(reports.reduce((sum, r) => sum + r.validationResult.fairScores.interoperable, 0) / total),
    reusable: Math.round(reports.reduce((sum, r) => sum + r.validationResult.fairScores.reusable, 0) / total),
  }

  const byDataType = {
    genomics: reports.filter(r => r.dataType === 'genomics').length,
    in_vivo: reports.filter(r => r.dataType === 'in_vivo').length,
    general: reports.filter(r => r.dataType === 'general').length,
  }

  const byResearcher = reports.reduce((acc, r) => {
    acc[r.researcher] = (acc[r.researcher] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return {
    total,
    compliant,
    nonCompliant,
    pendingReview,
    complianceRate: Math.round((compliant / total) * 100),
    avgScore: Math.round(avgScore),
    avgFairScores,
    byDataType,
    byResearcher,
  }
}
