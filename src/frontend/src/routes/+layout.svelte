<script>
    import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import logo from '$lib/assets/logo.png';
    import { AppShell } from '@skeletonlabs/skeleton';
    
</script>


<AppShell regionPage="relative" slotPageHeader="hide-scrollbar sticky top-0 z-10">

    <svelte:fragment>
        <slot />
    </svelte:fragment>
    
</AppShell>