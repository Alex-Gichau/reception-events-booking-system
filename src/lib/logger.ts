import fs from 'fs'
import path from 'path'

// Log file destination in the project root
const LOG_FILE_PATH = path.join(process.cwd(), 'terminal.log')

export function writeLog(message: string, level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS' = 'INFO') {
  try {
    const timestamp = new Date().toISOString()
    const logEntry = `[${timestamp}] [${level}] ${message}\n`
    
    // Write to standard standard out for actual development terminal
    if (level === 'ERROR') console.error(logEntry.trim())
    else if (level === 'WARN') console.warn(logEntry.trim())
    else console.log(logEntry.trim())
    
    // Append asynchronously to the persistent disk node file
    fs.appendFileSync(LOG_FILE_PATH, logEntry)
  } catch (error) {
    console.error("Critical failure writing to terminal.log on disk", error)
  }
}

export function readAllLogs() {
  try {
    if (!fs.existsSync(LOG_FILE_PATH)) {
      return "[SYSTEM] No terminal logs generated yet. Activity listener active.\n"
    }
    return fs.readFileSync(LOG_FILE_PATH, 'utf-8')
  } catch (error) {
    return `[SYSTEM ERROR] Failed to access log files: ${error}`
  }
}
