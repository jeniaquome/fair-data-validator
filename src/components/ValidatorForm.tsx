'use client'

import { useState } from 'react'
import { ExperimentalData, DataType, ValidationResult, validateData, getExperimentTypes } from '@/lib/validator'

interface Props {
  onValidationStart: () => void
  onValidationComplete: (result: ValidationResult) => void
}

const initialData: ExperimentalData = {
  dataType: 'genomics',
  title: '',
  description: '',
  researcher: '',
  date: new Date().toISOString().split('T')[0],
  sampleId: '',
  organism: '',
  geneSymbol: '',
  geneId: '',
  cellLine: '',
  tissueType: '',
  experimentType: '',
  protocol: '',
  equipment: '',
  chemicalCompounds: '',
  dosage: '',
  keywords: '',
  dataFormat: '',
  rawDataLocation: '',
}

export default function ValidatorForm({ onValidationStart, onValidationComplete }: Props) {
  const [formData, setFormData] = useState<ExperimentalData>(initialData)

  const handleChange = (field: keyof ExperimentalData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleDataTypeChange = (dataType: DataType) => {
    setFormData(prev => ({
      ...prev,
      dataType,
      experimentType: '',
    }))
  }

  const handleValidate = () => {
    onValidationStart()
    // Simulate async validation
    setTimeout(() => {
      const result = validateData(formData)
      onValidationComplete(result)
    }, 500)
  }

  const handleLoadSample = () => {
    const sampleData: ExperimentalData = {
      dataType: 'genomics',
      title: 'Single-cell RNA-seq analysis of tumor microenvironment',
      description: 'Comprehensive single-cell transcriptomic profiling of tumor-infiltrating immune cells in NSCLC patients. This study aims to identify novel immune cell subpopulations and their spatial distribution within the tumor microenvironment.',
      researcher: 'Dr. Sarah Chen <sarah.chen@genentech.com>',
      date: '2026-01-28',
      sampleId: 'GNE-20260128-001',
      organism: 'Homo sapiens',
      geneSymbol: 'EGFR',
      geneId: 'ENSG00000146648',
      cellLine: '',
      tissueType: 'Lung',
      experimentType: 'Single-cell RNA-seq',
      protocol: 'Tumor samples were dissociated using the Tumor Dissociation Kit (Miltenyi) following manufacturer protocol. Single cells were captured using 10x Genomics Chromium Controller. Libraries were prepared using Chromium Single Cell 3\' v3 chemistry and sequenced on NovaSeq 6000 (2x150bp, 50k reads/cell target).',
      equipment: '10x Genomics Chromium Controller, Illumina NovaSeq 6000',
      chemicalCompounds: '',
      dosage: '',
      keywords: 'single-cell, RNA-seq, tumor microenvironment, NSCLC, immune profiling, spatial transcriptomics',
      dataFormat: 'FASTQ, h5ad',
      rawDataLocation: 's3://gne-research-data/scrnaseq/2026/GNE-20260128-001/',
    }
    setFormData(sampleData)
  }

  const experimentTypes = getExperimentTypes(formData.dataType)

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Experimental Data Entry</h2>
        <button
          onClick={handleLoadSample}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Load Sample Data
        </button>
      </div>

      <div className="space-y-4">
        {/* Data Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Data Type</label>
          <div className="flex flex-wrap gap-2">
            {(['genomics', 'in_vivo', 'general'] as DataType[]).map(type => (
              <button
                key={type}
                onClick={() => handleDataTypeChange(type)}
                className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  formData.dataType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type === 'in_vivo' ? 'In Vivo' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descriptive title for the experiment"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              value={formData.description}
              onChange={e => handleChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Detailed description of the experiment objectives and methodology"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Researcher *</label>
            <input
              type="text"
              value={formData.researcher}
              onChange={e => handleChange('researcher', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name <email>"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
            <input
              type="date"
              value={formData.date}
              onChange={e => handleChange('date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sample ID *</label>
            <input
              type="text"
              value={formData.sampleId}
              onChange={e => handleChange('sampleId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., GNE-20260128-001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Organism *</label>
            <input
              type="text"
              value={formData.organism}
              onChange={e => handleChange('organism', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Homo sapiens, Mus musculus"
            />
          </div>
        </div>

        {/* Genomics-specific fields */}
        {formData.dataType === 'genomics' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gene Symbol</label>
              <input
                type="text"
                value={formData.geneSymbol}
                onChange={e => handleChange('geneSymbol', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., EGFR, TP53"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gene ID</label>
              <input
                type="text"
                value={formData.geneId}
                onChange={e => handleChange('geneId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., ENSG00000146648"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cell Line</label>
              <input
                type="text"
                value={formData.cellLine}
                onChange={e => handleChange('cellLine', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., HEK293, A549"
              />
            </div>
          </div>
        )}

        {/* In Vivo-specific fields */}
        {formData.dataType === 'in_vivo' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tissue Type</label>
              <input
                type="text"
                value={formData.tissueType}
                onChange={e => handleChange('tissueType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Liver, Brain, Heart"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chemical Compounds</label>
              <input
                type="text"
                value={formData.chemicalCompounds}
                onChange={e => handleChange('chemicalCompounds', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Compound A, Compound B"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
              <input
                type="text"
                value={formData.dosage}
                onChange={e => handleChange('dosage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 10 mg/kg, 100 nM"
              />
            </div>
          </div>
        )}

        {/* Experiment Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experiment Type</label>
            <select
              value={formData.experimentType}
              onChange={e => handleChange('experimentType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select experiment type</option>
              {experimentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data Format</label>
            <input
              type="text"
              value={formData.dataFormat}
              onChange={e => handleChange('dataFormat', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., FASTQ, CSV, HDF5"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Protocol *</label>
            <textarea
              value={formData.protocol}
              onChange={e => handleChange('protocol', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Detailed experimental protocol including reagents, conditions, and steps"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Equipment</label>
            <input
              type="text"
              value={formData.equipment}
              onChange={e => handleChange('equipment', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="List key instruments used"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Raw Data Location</label>
            <input
              type="text"
              value={formData.rawDataLocation}
              onChange={e => handleChange('rawDataLocation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., s3://bucket/path/"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Keywords *</label>
            <input
              type="text"
              value={formData.keywords}
              onChange={e => handleChange('keywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Comma-separated keywords for discoverability"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleValidate}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Validate FAIR Compliance
          </button>
        </div>
      </div>
    </div>
  )
}
