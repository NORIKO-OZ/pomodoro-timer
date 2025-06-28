class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 作業時間（25分）
        this.breakTime = 5 * 60; // 休憩時間（5分）
        this.isWorking = true; // 作業中フラグ
        this.isRunning = false; // タイマー実行中フラグ
        this.interval = null;

        this.initializeElements();
        this.initializeEventListeners();
    }

    initializeElements() {
        this.timerDisplay = document.getElementById('timer-display');
        this.statusText = document.getElementById('status-text');
        this.startBtn = document.getElementById('start-btn');
        this.stopBtn = document.getElementById('stop-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.workTimeInput = document.getElementById('work-time');
        this.breakTimeInput = document.getElementById('break-time');
    }

    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.workTimeInput.addEventListener('change', () => this.updateWorkTime());
        this.breakTimeInput.addEventListener('change', () => this.updateBreakTime());
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.isWorking = true;
        this.workTime = parseInt(this.workTimeInput.value) * 60 || 25 * 60;
        this.breakTime = parseInt(this.breakTimeInput.value) * 60 || 5 * 60;
        this.statusText.textContent = '作業時間';
        this.updateDisplay(this.workTime);
        this.interval = setInterval(() => this.tick(), 1000);
    }

    stop() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        clearInterval(this.interval);
    }

    reset() {
        this.stop();
        this.isWorking = true;
        this.workTime = parseInt(this.workTimeInput.value) * 60 || 25 * 60;
        this.breakTime = parseInt(this.breakTimeInput.value) * 60 || 5 * 60;
        this.statusText.textContent = '作業時間';
        this.updateDisplay(this.workTime);
    }

    updateWorkTime() {
        const minutes = parseInt(this.workTimeInput.value) || 25;
        this.workTime = minutes * 60;
        if (!this.isRunning) {
            this.updateDisplay(this.workTime);
        }
    }

    updateBreakTime() {
        const minutes = parseInt(this.breakTimeInput.value) || 5;
        this.breakTime = minutes * 60;
    }

    tick() {
        if (this.isWorking) {
            this.workTime--;
            if (this.workTime <= 0) {
                this.isWorking = false;
                this.workTime = parseInt(this.workTimeInput.value) * 60 || 25 * 60;
                this.statusText.textContent = '休憩時間';
                this.updateDisplay(this.breakTime);
            }
        } else {
            this.breakTime--;
            if (this.breakTime <= 0) {
                this.isWorking = true;
                this.breakTime = parseInt(this.breakTimeInput.value) * 60 || 5 * 60;
                this.statusText.textContent = '作業時間';
                this.updateDisplay(this.workTime);
            }
        }
        this.updateDisplay(this.isWorking ? this.workTime : this.breakTime);
    }

    updateDisplay(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// インスタンスの作成
const timer = new PomodoroTimer();
