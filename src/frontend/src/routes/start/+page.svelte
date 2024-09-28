<script>
    import { Stepper, Step, SlideToggle, InputChip } from '@skeletonlabs/skeleton';
    import logo from '$lib/assets/logo.png'

    let classes = ["COP2220"];
    let times = ["Monday, 08:00-09:30"];

    function onCompleteHandler(){ window.location.href = "../results"; }
</script>

<div class="flex justify-center items-center w-screen h-screen flex-col gap-5">
    <a href="../"><img width="150" src="{logo}" alt=""></a>
    <Stepper on:complete={onCompleteHandler} class="w-2/5 h-2/3">
        <Step>
            <svelte:fragment slot="header">Class Input</svelte:fragment>
            <div class="h-60 w-full flex flex-col gap-5">
                <InputChip allowUpperCase={true} bind:value={classes} name="chips" placeholder="Enter any value..." />
                <p>In the textbox above, type the classes you're planning to take which you want to be included in your generated schedules. Make sure to type each class one by one followed by your enter key. Each class should be formatted with using class codes (Ex. COP2220 or AMH2010)</p>
            </div>
        </Step>
        <Step>
            <svelte:fragment slot="header">Excluded Times</svelte:fragment>
            <div class="h-60 w-full flex flex-col gap-5">
                <InputChip allowUpperCase={true} bind:value={times} name="chips" placeholder="Enter any value..." />
                <p>Now enter any time slots you may want to keep without classes throughout your week alongside the day you want that timeslot. Please make sure it's in 24hour format and has the day before time (Ex. Monday, 11:00-15:00 or Friday, 08:00-09:30 or Monday, 00:00-24:00 to exclude that day)</p>
            </div>
        </Step>
        <Step>
            <svelte:fragment slot="header">Finish</svelte:fragment>
            <div class="h-60 w-full flex flex-col gap-2 justify-center">
                <div class="flex gap-5 justify-center">
                    <p class="h-52 bg-surface-600 w-60 rounded-3xl p-2 font-semibold">
                        Classes you want in schedule: 
                        {#each classes as classcode, i}
                            <p class="font-normal">{classcode}</p>
                        {/each}
                    </p>
                    <p class="h-52 bg-surface-600 w-60 rounded-3xl p-2 font-semibold">
                        Times you want excluded: 
                        {#each times as time, i}
                            <p class="font-normal">{time}</p>
                        {/each}
                    </p>
                </div>
                <p class="text-center pl-44 pr-44">Once you've confirmed everything's correct, hit complete and it'll process your schedules!</p>
            </div>
        </Step>
    </Stepper>
</div>