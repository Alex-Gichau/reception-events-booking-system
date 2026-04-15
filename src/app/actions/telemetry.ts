"use server"

import { writeLog } from "@/lib/logger"

export async function logClientAction(actionName: string, level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS' = 'INFO') {
  writeLog(`[CLIENT_SIDECAR] ${actionName}`, level);
}
