import { emit } from '@wide/emitter'


/**
 * All breakpoints
 * @type {Object<string, Number>}
 */
export let breakpoints = {}


/**
 * Current breakpoint size
 * @type {String}
 */
export let current = null


/**
 * Breakpoints sorted for mobile-first
 * @type {Array} 
 */
let mbps = []


/**
 * Get upper breakpoint value (lg -> xl.value)
 * @param {String} key
 * @return {Number}
 */
function nextOf(key) {
  for(let i = 0; i < mbps.length; i++) {
    if(mbps[i].key === key) {
      return mbps[i+1] ? mbps[i+1].value : Infinity
    }
  }
}


/**
 * Check breakpoint key existence
 * @param {String} key
 */
function validateKey(key) {
  if(isNaN(breakpoints[key])) {
    throw `Unknown breakpoint "${key}"`
  }
}


/**
 * Start listening for breakpoint change
 * @param {Object<string, Number>} sizes
 */
export default function breakpoint(sizes) {

  // keep given breakpoints for futur reference
  breakpoints = sizes

  // sort mobile-first values for futur reference
  for(let key in sizes) {
    mbps.push({ key, value: sizes[key] })
  }
  mbps.sort((a, b) => a.value > b.value ? 1 : -1)

  // listen for resize and emit event on breakpoint change
  window.addEventListener('resize', onResize)
  onResize()
}


/**
 * Emit event if breakpoint has changed (mobile-first)
 */
function onResize() {
  for(let i = mbps.length; i--;) {
    if(window.innerWidth >= mbps[i].value) {
      if(mbps[i].key !== current) {
        const prev = current
        current = mbps[i].key
        emit('breakpoint', current, prev)
        emit(`breakpoint.${current}`, current, prev)
      }
      break
    }
  }
}


/**
 * Check if size is above specific breakpoint (included)
 * @param {String} key 
 * @return {Boolean}
 */
export function up(key) {
  validateKey(key)
  return window.innerWidth >= breakpoints[key]
}


/**
 * Check if size is under specific breakpoint (excluded)
 * @param {String} key 
 * @return {Boolean}
 */
export function down(key) {
  validateKey(key)
  return window.innerWidth < breakpoints[key]
}


/**
 * Check if size is between specific breakpoints
 * @param {String} from 
 * @param {String} to 
 * @param {Boolean} included (from and to are included)
 * @return {Boolean}
 */
export function between(from, to, included = true) {
  validateKey(from)
  validateKey(to)
  const _from = included ? breakpoints[from] : nextOf(from)
  const _to = included ? nextOf(to) : breakpoints[to]
  return (window.innerWidth >= _from && window.innerWidth < _to)
}


/**
 * Check if size is in a specific breakpoint
 * @param {String} key 
 * @return {Boolean}
 */
export function only(key) {
  return between(key, key)
}


/**
 * Delete resize listener
 */
export function unlisten() {
  window.removeEventListener('resize', onResize)
}


/**
 * Export all methods
 */
breakpoint.breakpoints = breakpoints
breakpoint.current = current
breakpoint.up = up
breakpoint.down = down
breakpoint.between = between
breakpoint.only = only