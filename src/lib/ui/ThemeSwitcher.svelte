<script>
    import {onMount} from "svelte";

    export let float;

    let toggleSwitch;

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark'); //add this
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light'); //add this
        }
    }


    onMount(() => {
        const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
        toggleSwitch.checked = currentTheme && currentTheme === 'dark';
    });
</script>

<div class="theme-switch-wrapper" on:change={switchTheme} floating='{float ? float : "none"}'>
    <label class="theme-switch" for="checkbox">
        <input bind:this={toggleSwitch} type="checkbox" id="checkbox"/>
        <div class="slider round"></div>
    </label>
    <em>Enable Dark Mode!</em>
</div>

<style>
    /*Simple css to style it like a toggle switch*/
    .theme-switch-wrapper {
        display: flex;
        align-items: center;
    }

    .theme-switch-wrapper[floating="right"] {
        position: absolute;
        top: 0;
        right: 0;
    }

    .theme-switch-wrapper[floating="left"] {
        position: absolute;
        top: 0;
        left: 0;
    }

    .theme-switch-wrapper em {
        margin-left: 10px;
        font-size: 1rem;
    }

    .theme-switch {
        display: inline-block;
        height: 34px;
        position: relative;
        width: 60px;
    }

    .theme-switch input {
        display: none;
    }

    .slider {
        background-color: #ccc;
        bottom: 0;
        cursor: pointer;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transition: .4s;
    }

    .slider:before {
        background-color: #fff;
        bottom: 4px;
        content: "";
        height: 26px;
        left: 4px;
        position: absolute;
        width: 26px;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #66bb6a;
    }

    input:checked + .slider:before {
        transform: translateX(26px);
    }

    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>