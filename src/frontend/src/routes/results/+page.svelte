<script>
    import schedule from '$lib/assets/schedule.png'
    import logo from '$lib/assets/logo.png'
</script>

<div class="flex justify-center flex-col px-44 py-12">
    <a href="../" class="self-center"><img width="200" src="{logo}" alt="logo"></a>
    <h1 class="text-center text-7xl">Here are your schedule results!</h1>
    <div class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-10">
        {#each Array.from({ length: 4 }) as _, i}
            <div class="snap-start shrink-0 card text-center">
                <section class="">
                    <div class="">
                        <img src="{schedule}" class="rounded-3xl" alt="schedule">
                    </div>
                </section>
            </div>
        {/each}
    </div>
    <a href="../start" class="self-center"><div class="btn variant-filled-primary m-5">Try Again?</div></a>
</div>