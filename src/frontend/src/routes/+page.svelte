<script>
	import Hero from "$lib/hero.svelte";
	import Info from "$lib/Info.svelte";
	import Footer from "$lib/footer.svelte";
	let start = "/start"
</script>


<div class="bg-fixed h-screen mx-auto flex justify-center items-center">
	<Hero {start}/>
</div>

<div class=" h-screen mx-auto flex justify-center items-center">
	<Info />
</div>

<div class=" mx-auto flex justify-center items-center">
	<Footer />
</div>
