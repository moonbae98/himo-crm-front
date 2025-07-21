<template>
    <label class="switch">
        <input 
            type="checkbox" 
            :checked="isBlue"
            @change="handleToggle"
        >
        <span class="slider">
            <span class="slider-text black-text">BLACK</span>
            <span class="slider-text blue-text">BLUE</span>
        </span>
    </label>
</template>

<script>
export default {
    data() {
        return {
            // TODO: 유저가 설정한 테마 값으로 불러오기
            currentValue: 'black', // black or blue
            // currentValue: 'blue' // black or blue
        }
    },
    computed: {
        isBlue() {
            return this.currentValue === 'blue'
        }
    },
    methods: {
        setThemeClass() {
            // 기존 테마 클래스 제거 후 현재 값으로 설정
            document.body.className = document.body.className.replace(/theme-(black|blue)/g, '')
            document.body.classList.add(`theme-${this.currentValue}`)
        },
        handleToggle() {
            this.currentValue = this.currentValue === 'black' ? 'blue' : 'black'
            this.setThemeClass()
        }
    }
}
</script>

<style scoped>
.switch {
    position: relative;
    display: inline-block;
    width: 74px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #16151b;
    transition: .3s;
    border-radius: 25px;
    display: flex;
    align-items: center;
    overflow: hidden;
}

.slider:before {
    position: absolute;
    content: "";
    height: 30px;
    width: 30px;
    right: 2px;
    bottom: 2px;
    background-color: #47474c;
    transition: .3s;
    border-radius: 50%;
    z-index: 1;
}

.slider-text {
    position: absolute;
    width: 42px;
    text-align: center;
    font-size: 10px;
    font-weight: 600;
    color: #969696;
    text-transform: uppercase;
    z-index: 2;
    letter-spacing: -.025em;
    transition: opacity 0.3s;
}

.blue-text {
    opacity: 0;
    right: 0;
}

.black-text {
    opacity: 1;
    left: 0;
}

input:checked + .slider {
    background-color: #414141;
}

input:checked + .slider:before {
    transform: translateX(-40px);
    background-color: #125dd7;
}

input:checked + .slider .slider-text {
    color: #fff;
}

input:checked + .slider .blue-text {
    opacity: 1;
}

input:checked + .slider .black-text {
    opacity: 0;
}

.slider:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}
</style>