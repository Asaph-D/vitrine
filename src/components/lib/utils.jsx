import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names, handling conditional classes and merging Tailwind classes
 * @param {...any} inputs - Class names or objects with conditional classes
 * @returns {string} Combined and deduplicated class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a unique ID
 * @returns {string} A unique identifier
 */
export function generateUniqueId() {
  return Math.random().toString(36).substring(2, 9)
}

/**
 * Formats currency with optional locale and currency
 * @param {number} amount - The monetary amount
 * @param {string} [locale='fr-FR'] - Locale for formatting
 * @param {string} [currency='EUR'] - Currency code
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, locale = 'fr-FR', currency = 'EUR') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount)
}

/**
 * Truncates text to a specified length
 * @param {string} text - The input text
 * @param {number} [maxLength=100] - Maximum length before truncation
 * @param {string} [ellipsis='...'] - Ellipsis to append
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 100, ellipsis = '...') {
  if (!text) return ''
  return text.length > maxLength 
    ? text.substring(0, maxLength).trim() + ellipsis 
    : text
}

/**
 * Debounces a function
 * @param {Function} func - Function to debounce
 * @param {number} [delay=300] - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, delay = 300) {
  let timeoutId
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

/**
 * Deep clones an object or array
 * @param {*} obj - Object or array to clone
 * @returns {*} Deep cloned object
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime())
  }

  // Handle Array
  if (Array.isArray(obj)) {
    return obj.map(deepClone)
  }

  // Handle Object
  const clonedObj = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key])
    }
  }

  return clonedObj
}

/**
 * Converts a kebab-case string to camelCase
 * @param {string} str - Kebab-case string
 * @returns {string} camelCase string
 */
export function kebabToCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}

/**
 * Checks if a value is empty
 * @param {*} value - Value to check
 * @returns {boolean} Whether the value is empty
 */
export function isEmpty(value) {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' || Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * Safely parses JSON
 * @param {string} jsonString - JSON string to parse
 * @param {*} [defaultValue=null] - Default value if parsing fails
 * @returns {*} Parsed JSON or default value
 */
export function safeJsonParse(jsonString, defaultValue = null) {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    console.warn('JSON parsing error:', error)
    return defaultValue
  }
}