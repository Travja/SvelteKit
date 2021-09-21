<script>
    import Bug from '$lib/bugs/Bug.svelte';
    import BugListItem from '$lib/bugs/BugListItem.svelte';
    import ThemeSwitcher from '$lib/ui/ThemeSwitcher.svelte';
    import Footer from '$lib/Footer.svelte';

    let bugObjs = [];

    let bugs = [
        {
            status: "confirmed",
            title: "This is a bug",
            description: "Hey.. this doesnt work. I've tried everything but I can't get it to go anywhere. Help me! If I keep typing a really long thing, will it solve my problems? If I pester, does it work?"
        },
        {title: "This is bug 2", status: "rejected"},
        {title: "This is bug 3", status: "inprogress", comments: ["Comment one", "Comment two.. this works."]},
        {}
    ];

    const cards = [
        {src: "https://analyticsindiamag.com/wp-content/uploads/2020/10/7d744a684fe03ebc7e8de545f97739dd.jpg"},
        {src: "https://thumbs.dreamstime.com/b/rainbow-love-heart-background-red-wood-60045149.jpg"},
        {src: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
    ];

    let list;
    let bugElm;
    let activeIndex;
    const clickBug = (e) => {
        console.log(e.detail);
        let idx = e.detail.index;

        if (bugElm && activeIndex !== idx) {
            bugElm.addEventListener('outroend', () => showBug(bugs[idx]));
            closeBug();
        } else showBug(bugs[idx]);
        activeIndex = idx;
    };

    const handleUpdated = evt => {
        bugs[activeIndex].description = evt.detail.description;
    };

    const closeBug = () => {
        openBug = undefined;
        bugElm = undefined;
    };

    let openBug;
    const showBug = (bug) => {
        openBug = bug;
    };
</script>

<svelte:head>
    <title>Bug Tracker</title>
</svelte:head>

<header>
    <h1>Travja's Bug Tracker</h1>
</header>
<div class="content">
        <ThemeSwitcher float="right"/>
        <h1>Bugs</h1>
        <ul bind:this={list}>
            {#each bugs as bug, i}
                <BugListItem {...bug} index={i} on:click={clickBug}/>
            {/each}
        </ul>
        <!--    <div class="wrapper">-->
        <!--        {#each cards as card}-->
        <!--            <Card {...card}/>-->
        <!--        {/each}-->
        <!--    </div>-->
</div>

{#if openBug}
    <Bug class="modal" bind:this={bugElm}
         {...openBug}
         on:updated={handleUpdated}
         on:close={closeBug}/>
{/if}

<style>
    header {
        background-color: rgba(0, 0, 0, 0.3);
        box-shadow: 0 2px 8px #2e2e2e;
    }

    header h1 {
        margin: 0;
        padding: 30px;
        text-align: center;
        font-family: "Segoe UI Black", sans-serif;
        text-decoration: underline;
        color: var(--accent-color);
        text-shadow: 3px 3px 4px #2e2e2e;
        letter-spacing: 3px;
        font-size: 3em;
    }

    .transitions-enabled header h1 {
        transition-property: color, background-color, text-shadow;
        transition-duration: .3s;
        transition-timing-function: ease-in-out;
    }

    .content {
        position: relative;
        margin: 15px auto;
        width: 100%;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }
</style>