'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1400,        // 크기 조정
    height: 900,
    show: false,        // 로딩 완료 후 표시
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      allowRunningInsecureContent: true
    }
  })

  // 간단한 User-Agent 설정
  win.webContents.setUserAgent('CRM-Desktop-App/1.0')

  // 로딩 완료 후 창 표시
  win.once('ready-to-show', () => {
    win.show()
    console.log('Electron 창이 표시됩니다')
  })

  // 디버깅을 위한 이벤트 리스너 추가
  win.webContents.on('did-finish-load', () => {
    console.log('페이지 로딩 완료')
  })

  win.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('페이지 로딩 실패:', errorCode, errorDescription, validatedURL)
  })

  win.webContents.on('dom-ready', () => {
    console.log('DOM 준비 완료')
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    console.log('개발 모드 - Dev Server URL:', process.env.WEBPACK_DEV_SERVER_URL)
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    // 프로덕션 모드
    console.log('프로덕션 모드 - 로컬 파일 로드')
    createProtocol('app')
    
    try {
      // Load the index.html when not in development
      await win.loadURL('app://./index.html')
      console.log('app://./index.html 로드 성공')
    } catch (error) {
      console.error('app://./index.html 로드 실패:', error)
      
      // 대안: 빈 페이지라도 표시
      win.loadURL('data:text/html;charset=utf-8,<html><body><h1>로딩 중...</h1><p>CRM 시스템을 불러오고 있습니다.</p></body></html>')
    }
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  console.log('Electron 앱 시작')
  console.log('개발 모드:', isDevelopment)
  console.log('플랫폼:', process.platform)
  
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
      console.log('Vue Devtools 설치 완료')
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
