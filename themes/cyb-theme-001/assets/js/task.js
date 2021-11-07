class Task {
    constructor() {
        this.taskList = [];
        this.totalTaskCount = 0;
        this.currentTaskNumber = 0;
        this.lastTaskName = '';
        this.taskHandle = null;
        this.statusRefreshScheduled = false;

        this.progressBar = document.getElementById('progress');
        this.status = document.getElementById('status');
    }

    enqueueTask(name, taskHandler, taskData) {
        let instance = this;
        this.taskList.push({
            name: name,
            handler: taskHandler,
            data: taskData
        });

        this.totalTaskCount++;
        if (!this.taskHandle) {
            this.taskHandle = requestIdleCallback((deadline) => {
                instance.runTaskQueue(deadline);
            }, {timeout: 3000});
        }

        this.scheduleStatusRefresh();
    }

    runTaskQueue(deadline) {
        let instance = this;
        while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && this.taskList.length) {
            let task = this.taskList.shift();
            this.lastTaskName = task.name;
            this.currentTaskNumber++;

            task.handler(task.data);
            this.scheduleStatusRefresh();
        }

        if (this.taskList.length) {
            this.taskHandle = requestIdleCallback((deadline) => {
                instance.runTaskQueue(deadline);
            }, {timeout: 1000});
        } else {
            this.taskHandle = 0;
        }
    }

    scheduleStatusRefresh() {
        let instance = this;
        if (!this.statusRefreshScheduled) {
            requestAnimationFrame(() => {
                instance.updateDisplay();
            });
            this.statusRefreshScheduled = true;
        }
    }

    updateStatus(message, current, total) {
        if (typeof current === 'undefined' || current < 0) {
            current = 0;
        }
        if (typeof total === 'undefined' || total < 0) {
            total = 0;
        }
        this.progressBar.value = current;
        this.progressBar.max = total;

        if (total > 0) {
            message += ' (' + current + ' of ' + total + ')'
        }
        this.status.innerHTML = message;
    }

    updateDisplay() {
        if (this.taskList[0] && this.taskList[0].hasOwnProperty('name')) {
            this.lastTaskName = this.taskList[0].name;
        }
        if (this.lastTaskName === '') {
            this.lastTaskName = 'Task';
        }

        this.updateStatus(this.lastTaskName, this.currentTaskNumber, this.totalTaskCount);
        this.statusRefreshScheduled = false;
    }
}
module.exports = {Task};
