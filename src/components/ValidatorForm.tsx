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

  const dataTypeConfig = {
    genomics: { icon: '🧬', label: 'Genomics', color: 'from-indigo-500 to-violet-600', bgLight: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700' },
    in_vivo: { icon: '🐁', label: 'In Vivo', color: 'from-emerald-500 to-teal-600', bgLight: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
    general: { icon: '🔬', label: 'General', color: 'from-amber-500 to-orange-600', bgLight: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">Experimental Data Entry</h2>
          <p className="text-sm text-slate-500">Fill in the required fields for validation</p>
        </div>
        <button
          onClick={handleLoadSample}
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Load Sample Data
        </button>
      </div>

      <div className="space-y-5">
        {/* Data Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">Data Type</label>
          <div className="flex flex-wrap gap-2">
            {(['genomics', 'in_vivo', 'general'] as DataType[]).map(type => {
              const config = dataTypeConfig[type]
              const isSelected = formData.dataType === type
              return (
                <button
                  key={type}
                  onClick={() => handleDataTypeChange(type)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                    isSelected
                      ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                      : `${config.bgLight} ${config.text} border ${config.border} hover:shadow-md`
                  }`}
                >
                  <span>{config.icon}</span>
                  {config.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Title <span className="text-rose-500">*</span></label>
            <input
              type="text"
              value={formData.title}
              onChange={e => handleChange('title', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Descriptive title for the experiment"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description <span className="text-rose-500">*</span></label>
            <textarea
              value={formData.description}
              onChange={e => handleChange('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
              placeholder="Detailed description of the experiment objectives and methodology"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Researcher <span className="text-rose-500">*</span></label>
            <input
              type="text"
              value={formData.researcher}
              onChange={e => handleChange('researcher', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Name <email>"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date <span className="text-rose-500">*</span></label>
            <input
              type="date"
              value={formData.date}
              onChange={e => handleChange('date', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Sample ID <span className="text-rose-500">*</span></label>
            <input
              type="text"
              value={formData.sampleId}
              onChange={e => handleChange('sampleId', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="e.g., GNE-20260128-001"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Organism <span className="text-rose-500">*</span></label>
            <input
              type="text"
              value={formData.organism}
              onChange={e => handleChange('organism', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="e.g., Homo sapiens, Mus musculus"
            />
          </div>
        </div>

        {/* Genomics-specific fields */}
        {formData.dataType === 'genomics' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            <div className="col-span-2 -mt-2 mb-2">
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Genomics Fields</span>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Gene Symbol</label>
              <input
                type="text"
                value={formData.geneSymbol}
                onChange={e => handleChange('geneSymbol', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="e.g., EGFR, TP53"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Gene ID</label>
              <input
                type="text"
                value={formData.geneId}
                onChange={e => handleChange('geneId', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="e.g., ENSG00000146648"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Cell Line</label>
              <input
                type="text"
                value={formData.cellLine}
                onChange={e => handleChange('cellLine', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="e.g., HEK293, A549"
              />
            </div>
          </div>
        )}

        {/* In Vivo-specific fields */}
        {formData.dataType === 'in_vivo' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            <div className="col-span-2 -mt-2 mb-2">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">In Vivo Fields</span>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tissue Type</label>
              <input
                type="text"
                value={formData.tissueType}
                onChange={e => handleChange('tissueType', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="e.g., Liver, Brain, Heart"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Chemical Compounds</label>
              <input
                type="text"
                value={formData.chemicalCompounds}
                onChange={e => handleChange('chemicalCompounds', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="e.g., Compound A, Compound B"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Dosage</label>
              <input
                type="text"
                value={formData.dosage}
                onChange={e => handleChange('dosage', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="e.g., 10 mg/kg, 100 nM"
              />
            </div>
          </div>
        )}

        {/* Experiment Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
          <div className="col-span-2 -mt-2 mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Experiment Details</span>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Experiment Type</label>
            <select
              value={formData.experimentType}
              onChange={e => handleChange('experimentType', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="">Select experiment type</option>
              {experimentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Data Format</label>
            <input
              type="text"
              value={formData.dataFormat}
              onChange={e => handleChange('dataFormat', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="e.g., FASTQ, CSV, HDF5"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Protocol <span className="text-rose-500">*</span></label>
            <textarea
              value={formData.protocol}
              onChange={e => handleChange('protocol', e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
              placeholder="Detailed experimental protocol including reagents, conditions, and steps"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Equipment</label>
            <input
              type="text"
              value={formData.equipment}
              onChange={e => handleChange('equipment', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="List key instruments used"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Raw Data Location</label>
            <input
              type="text"
              value={formData.rawDataLocation}
              onChange={e => handleChange('rawDataLocation', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="e.g., s3://bucket/path/"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Keywords <span className="text-rose-500">*</span></label>
            <input
              type="text"
              value={formData.keywords}
              onChange={e => handleChange('keywords', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Comma-separated keywords for discoverability"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleValidate}
            className="w-full btn-brand py-3.5 px-4 text-base flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Validate FAIR Compliance
          </button>
        </div>
      </div>
    </div>
  )
}
