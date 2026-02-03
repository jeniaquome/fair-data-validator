export type DataType = 'genomics' | 'in_vivo' | 'general'

export interface ExperimentalData {
  dataType: DataType
  title: string
  description: string
  researcher: string
  date: string
  sampleId: string
  organism: string
  geneSymbol?: string
  geneId?: string
  cellLine?: string
  tissueType?: string
  experimentType: string
  protocol: string
  equipment?: string
  chemicalCompounds?: string
  dosage?: string
  keywords: string
  dataFormat?: string
  rawDataLocation?: string
}

export interface ValidationIssue {
  field: string
  severity: 'error' | 'warning' | 'info'
  message: string
  suggestion?: string
  fairPrinciple: 'F' | 'A' | 'I' | 'R'
}

export interface ValidationResult {
  isValid: boolean
  score: number
  maxScore: number
  issues: ValidationIssue[]
  fairScores: {
    findable: number
    accessible: number
    interoperable: number
    reusable: number
  }
}

// Standard ontology prefixes and patterns
const GENE_ID_PATTERNS = {
  ensembl: /^ENSG\d{11}$/,
  ncbi: /^\d+$/,
  hgnc: /^HGNC:\d+$/,
}

const ORGANISM_ONTOLOGY: Record<string, string> = {
  'human': 'NCBITaxon:9606',
  'homo sapiens': 'NCBITaxon:9606',
  'mouse': 'NCBITaxon:10090',
  'mus musculus': 'NCBITaxon:10090',
  'rat': 'NCBITaxon:10116',
  'rattus norvegicus': 'NCBITaxon:10116',
  'zebrafish': 'NCBITaxon:7955',
  'danio rerio': 'NCBITaxon:7955',
}

const TISSUE_ONTOLOGY: Record<string, string> = {
  'liver': 'UBERON:0002107',
  'brain': 'UBERON:0000955',
  'heart': 'UBERON:0000948',
  'kidney': 'UBERON:0002113',
  'lung': 'UBERON:0002048',
  'blood': 'UBERON:0000178',
  'skin': 'UBERON:0002097',
  'muscle': 'UBERON:0001630',
}

const EXPERIMENT_TYPES: Record<DataType, string[]> = {
  genomics: [
    'RNA-seq',
    'ChIP-seq',
    'ATAC-seq',
    'Whole Genome Sequencing',
    'Exome Sequencing',
    'Single-cell RNA-seq',
    'Spatial Transcriptomics',
    'Methylation Array',
    'CRISPR Screen',
  ],
  in_vivo: [
    'Pharmacokinetics',
    'Toxicology Study',
    'Efficacy Study',
    'Dose-Response',
    'Biodistribution',
    'Imaging Study',
    'Behavioral Assessment',
    'Histopathology',
  ],
  general: [
    'Western Blot',
    'ELISA',
    'Flow Cytometry',
    'Microscopy',
    'Mass Spectrometry',
    'PCR',
    'Cell Viability',
    'Other',
  ],
}

export function validateData(data: ExperimentalData): ValidationResult {
  const issues: ValidationIssue[] = []
  let findableScore = 0
  let accessibleScore = 0
  let interoperableScore = 0
  let reusableScore = 0

  // FINDABLE validations
  // F1: Unique identifier
  if (data.sampleId && data.sampleId.trim()) {
    if (/^[A-Z]{2,4}-\d{4,}-\d{3,}$/.test(data.sampleId)) {
      findableScore += 15
    } else {
      findableScore += 8
      issues.push({
        field: 'sampleId',
        severity: 'warning',
        message: 'Sample ID does not follow standard format',
        suggestion: 'Use format: PREFIX-YYYYMMDD-NNN (e.g., EXP-20260201-001)',
        fairPrinciple: 'F',
      })
    }
  } else {
    issues.push({
      field: 'sampleId',
      severity: 'error',
      message: 'Sample ID is required for findability',
      suggestion: 'Provide a unique sample identifier',
      fairPrinciple: 'F',
    })
  }

  // F2: Rich metadata - title and description
  if (data.title && data.title.length >= 10) {
    findableScore += 10
  } else {
    issues.push({
      field: 'title',
      severity: 'error',
      message: 'Title must be descriptive (at least 10 characters)',
      fairPrinciple: 'F',
    })
  }

  if (data.description && data.description.length >= 50) {
    findableScore += 10
  } else if (data.description && data.description.length >= 20) {
    findableScore += 5
    issues.push({
      field: 'description',
      severity: 'warning',
      message: 'Description should be more detailed for better findability',
      suggestion: 'Include experimental objectives, methods summary, and expected outcomes',
      fairPrinciple: 'F',
    })
  } else {
    issues.push({
      field: 'description',
      severity: 'error',
      message: 'Description is required and should be comprehensive',
      fairPrinciple: 'F',
    })
  }

  // F3: Keywords
  const keywords = data.keywords?.split(',').map(k => k.trim()).filter(k => k)
  if (keywords && keywords.length >= 3) {
    findableScore += 10
  } else if (keywords && keywords.length > 0) {
    findableScore += 5
    issues.push({
      field: 'keywords',
      severity: 'warning',
      message: 'Add more keywords for better discoverability',
      suggestion: 'Include at least 3 relevant keywords (comma-separated)',
      fairPrinciple: 'F',
    })
  } else {
    issues.push({
      field: 'keywords',
      severity: 'error',
      message: 'Keywords are required for findability',
      fairPrinciple: 'F',
    })
  }

  // ACCESSIBLE validations
  // A1: Data location
  if (data.rawDataLocation && data.rawDataLocation.trim()) {
    if (data.rawDataLocation.startsWith('s3://') ||
        data.rawDataLocation.startsWith('gs://') ||
        data.rawDataLocation.startsWith('https://')) {
      accessibleScore += 15
    } else {
      accessibleScore += 8
      issues.push({
        field: 'rawDataLocation',
        severity: 'info',
        message: 'Consider using a persistent cloud storage URI',
        suggestion: 'Use s3://, gs://, or https:// URIs for better accessibility',
        fairPrinciple: 'A',
      })
    }
  } else {
    issues.push({
      field: 'rawDataLocation',
      severity: 'warning',
      message: 'Raw data location not specified',
      suggestion: 'Provide a path or URI to the raw data for accessibility',
      fairPrinciple: 'A',
    })
  }

  // A2: Researcher contact
  if (data.researcher && data.researcher.includes('@')) {
    accessibleScore += 10
  } else if (data.researcher) {
    accessibleScore += 5
    issues.push({
      field: 'researcher',
      severity: 'info',
      message: 'Consider including email for contact',
      suggestion: 'Format: Name <email@domain.com>',
      fairPrinciple: 'A',
    })
  } else {
    issues.push({
      field: 'researcher',
      severity: 'error',
      message: 'Researcher information is required',
      fairPrinciple: 'A',
    })
  }

  // INTEROPERABLE validations
  // I1: Organism standardization
  const organismLower = data.organism?.toLowerCase().trim()
  if (organismLower && ORGANISM_ONTOLOGY[organismLower]) {
    interoperableScore += 15
  } else if (data.organism) {
    interoperableScore += 5
    const suggestions = Object.keys(ORGANISM_ONTOLOGY).slice(0, 4).join(', ')
    issues.push({
      field: 'organism',
      severity: 'warning',
      message: 'Organism name not recognized in standard ontology',
      suggestion: `Use standard names: ${suggestions}`,
      fairPrinciple: 'I',
    })
  } else {
    issues.push({
      field: 'organism',
      severity: 'error',
      message: 'Organism is required',
      fairPrinciple: 'I',
    })
  }

  // I2: Gene ID validation (for genomics)
  if (data.dataType === 'genomics') {
    if (data.geneId) {
      const isValidGeneId = Object.values(GENE_ID_PATTERNS).some(p => p.test(data.geneId!))
      if (isValidGeneId) {
        interoperableScore += 10
      } else {
        interoperableScore += 3
        issues.push({
          field: 'geneId',
          severity: 'warning',
          message: 'Gene ID format not recognized',
          suggestion: 'Use Ensembl (ENSG...), NCBI Gene ID, or HGNC ID',
          fairPrinciple: 'I',
        })
      }
    } else if (data.geneSymbol) {
      interoperableScore += 5
      issues.push({
        field: 'geneId',
        severity: 'info',
        message: 'Consider adding a standardized Gene ID',
        suggestion: 'Gene symbols can be ambiguous; add Ensembl or NCBI ID for interoperability',
        fairPrinciple: 'I',
      })
    }
  }

  // I3: Tissue ontology (for in_vivo)
  if (data.dataType === 'in_vivo' && data.tissueType) {
    const tissueLower = data.tissueType.toLowerCase().trim()
    if (TISSUE_ONTOLOGY[tissueLower]) {
      interoperableScore += 10
    } else {
      interoperableScore += 3
      issues.push({
        field: 'tissueType',
        severity: 'warning',
        message: 'Tissue type not in standard ontology (UBERON)',
        suggestion: `Standard tissues: ${Object.keys(TISSUE_ONTOLOGY).join(', ')}`,
        fairPrinciple: 'I',
      })
    }
  }

  // I4: Experiment type standardization
  const validExperiments = EXPERIMENT_TYPES[data.dataType]
  if (validExperiments.includes(data.experimentType)) {
    interoperableScore += 10
  } else if (data.experimentType) {
    interoperableScore += 5
    issues.push({
      field: 'experimentType',
      severity: 'info',
      message: 'Experiment type not in standard list',
      suggestion: `Consider using: ${validExperiments.slice(0, 4).join(', ')}`,
      fairPrinciple: 'I',
    })
  }

  // I5: Data format
  const standardFormats = ['FASTQ', 'BAM', 'VCF', 'CSV', 'TSV', 'JSON', 'HDF5', 'DICOM']
  if (data.dataFormat && standardFormats.some(f => data.dataFormat!.toUpperCase().includes(f))) {
    interoperableScore += 5
  } else if (data.dataFormat) {
    issues.push({
      field: 'dataFormat',
      severity: 'info',
      message: 'Consider using a standard data format',
      suggestion: `Standard formats: ${standardFormats.join(', ')}`,
      fairPrinciple: 'I',
    })
  }

  // REUSABLE validations
  // R1: Protocol documentation
  if (data.protocol && data.protocol.length >= 100) {
    reusableScore += 15
  } else if (data.protocol && data.protocol.length >= 30) {
    reusableScore += 8
    issues.push({
      field: 'protocol',
      severity: 'warning',
      message: 'Protocol description could be more detailed',
      suggestion: 'Include step-by-step procedure, reagents, and conditions for reproducibility',
      fairPrinciple: 'R',
    })
  } else {
    issues.push({
      field: 'protocol',
      severity: 'error',
      message: 'Detailed protocol is required for reusability',
      fairPrinciple: 'R',
    })
  }

  // R2: Date validation
  if (data.date) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/
    if (datePattern.test(data.date)) {
      reusableScore += 10
    } else {
      reusableScore += 5
      issues.push({
        field: 'date',
        severity: 'warning',
        message: 'Date format should be ISO 8601',
        suggestion: 'Use YYYY-MM-DD format',
        fairPrinciple: 'R',
      })
    }
  } else {
    issues.push({
      field: 'date',
      severity: 'error',
      message: 'Experiment date is required',
      fairPrinciple: 'R',
    })
  }

  // R3: Equipment/Chemical compounds for reproducibility
  if (data.dataType === 'in_vivo') {
    if (data.chemicalCompounds && data.dosage) {
      reusableScore += 10
    } else {
      issues.push({
        field: 'chemicalCompounds',
        severity: 'warning',
        message: 'Compound and dosage information improves reproducibility',
        suggestion: 'Include compound names and dosages used in the study',
        fairPrinciple: 'R',
      })
    }
  }

  if (data.equipment) {
    reusableScore += 5
  } else {
    issues.push({
      field: 'equipment',
      severity: 'info',
      message: 'Equipment information helps reproducibility',
      suggestion: 'List key instruments and their model numbers',
      fairPrinciple: 'R',
    })
  }

  // Calculate total score
  const maxFindable = 45
  const maxAccessible = 25
  const maxInteroperable = 50
  const maxReusable = 40

  const score = findableScore + accessibleScore + interoperableScore + reusableScore
  const maxScore = maxFindable + maxAccessible + maxInteroperable + maxReusable

  const hasErrors = issues.some(i => i.severity === 'error')

  return {
    isValid: !hasErrors && score >= maxScore * 0.6,
    score,
    maxScore,
    issues,
    fairScores: {
      findable: Math.round((findableScore / maxFindable) * 100),
      accessible: Math.round((accessibleScore / maxAccessible) * 100),
      interoperable: Math.round((interoperableScore / maxInteroperable) * 100),
      reusable: Math.round((reusableScore / maxReusable) * 100),
    },
  }
}

export function getOntologyMapping(field: string, value: string): string | null {
  const valueLower = value.toLowerCase().trim()

  if (field === 'organism') {
    return ORGANISM_ONTOLOGY[valueLower] || null
  }
  if (field === 'tissueType') {
    return TISSUE_ONTOLOGY[valueLower] || null
  }
  return null
}

export function getExperimentTypes(dataType: DataType): string[] {
  return EXPERIMENT_TYPES[dataType]
}
