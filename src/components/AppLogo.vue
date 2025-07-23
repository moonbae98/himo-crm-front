<template>
    <div :class="['logo', `size-${size}`, `align-${align}`]">
        <img src="/himo-logo.svg" alt="하이모">
        CRM
    </div>
</template>

<script>
export default {
    props: {
        size: {
            type: String,
            default: 'small',
            validator(value) {
                return ['small', 'medium'].includes(value)
            }
        },
        align: {
            type: String,
            default: 'start',
            validator(value) {
                return ['start', 'center', 'end'].includes(value)
            }
        }
    }
}
</script>

<style>
.logo {
    display: flex;
    align-items: center;
    gap: .5em;
    color: #125dd7;
    font-size: 28px;
    font-weight: 700;
}

.theme-brown .logo {
    color: var(--theme-brown-primary-color);
}

.logo > img {
    width: 100%;
    max-width: 96px;
}

.logo.size-small {
    font-size: 28px;
}

.logo.size-small > img {
    max-width: 96px;
}

.logo.size-medium {
    font-size: 40px;
}

.logo.size-medium > img {
    max-width: 130px;
}

.logo.align-start {
    justify-content: flex-start;
}

.logo.align-center {
    justify-content: center;
}

.logo.align-end {
    justify-content: flex-end;
}
</style>