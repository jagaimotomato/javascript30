const playerbtn = document.querySelector(".player__button");
const video = document.querySelector(".viewer");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");

playerbtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playerbtn.textContent = "❚ ❚";
  } else {
    video.pause();
    playerbtn.textContent = "►"; // 播放图标
  }
});

// 获取 video 进度
function handleProgress() {
  // 计算播放进度百分比
  const percent = (video.currentTime / video.duration) * 100;

  // 更新进度条宽度
  progressBar.style.flexBasis = `${percent}%`;

  // 在控制台显示详细信息（可选，用于调试）
  console.log(`播放进度: ${percent.toFixed(2)}%`);
  console.log(`当前时间: ${formatTime(video.currentTime)}`);
  console.log(`总时长: ${formatTime(video.duration)}`);
}

// 格式化时间显示（分:秒）
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// 点击进度条跳转功能
function scrub(e) {
  // 计算点击位置相对于进度条的百分比
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// 监听视频时间更新事件
video.addEventListener("timeupdate", handleProgress);

// 监听进度条点击事件
progress.addEventListener("click", scrub);

// 监听进度条拖拽事件
let mousedown = false;
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mouseup", () => (mousedown = false));

// 获取其他控制元素
const volumeSlider = document.querySelector('input[name="volume"]');
const playbackRateSlider = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll("[data-skip]");

// 音量控制
function handleRangeUpdate() {
  video[this.name] = this.value;
  console.log(`${this.name}: ${this.value}`);
}

// 跳转功能
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// 绑定滑块事件
volumeSlider.addEventListener("change", handleRangeUpdate);
volumeSlider.addEventListener("mousemove", handleRangeUpdate);
playbackRateSlider.addEventListener("change", handleRangeUpdate);
playbackRateSlider.addEventListener("mousemove", handleRangeUpdate);

// 绑定跳转按钮事件
skipButtons.forEach((button) => button.addEventListener("click", skip));

// 视频加载完成后显示总时长
video.addEventListener("loadedmetadata", () => {
  console.log("视频加载完成");
  console.log(`视频总时长: ${formatTime(video.duration)}`);
  console.log(`视频尺寸: ${video.videoWidth} x ${video.videoHeight}`);
});

// 播放状态改变时的回调
video.addEventListener("play", () => {
  console.log("视频开始播放");
});

video.addEventListener("pause", () => {
  console.log("视频暂停");
});

// 初始化
console.log("🎬 视频播放器初始化完成");
console.log("功能列表:");
console.log("- ▶️ 播放/暂停控制");
console.log("- 📊 实时进度显示");
console.log("- 🖱️ 点击进度条跳转");
console.log("- 🎚️ 音量调节");
console.log("- ⚡ 播放速度调节");
console.log("- ⏭️ 快进/快退按钮");
