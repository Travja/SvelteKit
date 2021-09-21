<svelte:options accessors/>
<script>
    import {createEventDispatcher} from "svelte";

    export let status = "unconfirmed";
    export let title = "Untitled";
    export let comments = [];
    export let index;

    let statuses = {
        unconfirmed: "Unconfirmed",
        confirmed: "Confirmed",
        rejected: "Rejected",
        inprogress: "In Progress"
    }

    const dispatch = createEventDispatcher();
    const clicked = () => {
        dispatch('click', {target: base, index});
    };
    let base;
</script>

<li on:click={clicked} {index} bind:this={base}>
    <div class="title">{title}</div>
    <div class="status {status}">{statuses[status]}</div>
    <div class="cmnt">{comments.length} comments</div>
</li>

<style>
    li {
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--fg-color);
        padding: 20px 10px;
    }

    .transitions-enabled li {
        transition: background-color .2s ease-out;
    }

    li:hover {
        background-color: rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }

    .cmnt {
        color: var(--disabled-fg-color);
    }

    .title {
        flex-grow: 1;
        font-weight: bold;
        font-size: 1.2em;
    }

    .status {
        color: white;
        display: inline-block;
        background-color: #2e2e2e;
        padding: .4em;
        margin-right: 10px;
        border-radius: 8px;
    }

    .confirmed {
        background-color: #49bd4e;
    }

    .rejected {
        background-color: #b43333;
    }

    .inprogress {
        background-color: #4444ff;
    }
</style>