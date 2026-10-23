import Image from "next/image";
import Link from "next/link";
export const metadata = { title: "Redesigning Nasiye through user research · Mohamed Bashir" };
export default function NasiyeStory() {
 return <main className="mx-auto max-w-3xl px-6 py-16 text-[#b8b8bd]">
 <Link href="/" className="text-sm hover:text-white">← Back</Link>
 <p className="mt-12 text-sm">18 October 2026</p>
 <h1 className="mt-3 text-3xl font-semibold leading-tight text-white">Redesigning Nasiye through user research</h1>
 <div className="mt-8 space-y-5 text-base leading-relaxed"><p>I work as Product Development Manager at Nasiye. For the redesign, we started by talking to the people who use the product. We conducted user interviews both locally and with people in the Somali diaspora.</p>
<p>Those conversations were part of our research. We used what we learned to guide the design and then moved into prototyping, so we could explore the experience through screens and flows.</p>
<p>The examples in the Nasiye redesign case study show the home screen before and after, alongside Live TV, categories, the title page, and the kids section. They make the design work concrete and show how the screens fit together.</p>
<p>My work connects that research and design process with product priorities and coordination with engineering. This is the part of product development I enjoy: understanding a problem, exploring it through design, and helping turn it into something people can use.</p>
</div><section className="mt-12 space-y-8" aria-label="Nasiye design examples"><figure><Image src="/work/nasiye-before-after.jpg" alt="Home screen before and after" width={1600} height={1200} className="h-auto w-full rounded-xl" /><figcaption className="mt-3 text-sm">Home screen before and after</figcaption></figure>
<figure><Image src="/work/nasiye-v2-live-tv.jpg" alt="Live TV" width={1600} height={1200} className="h-auto w-full rounded-xl" /><figcaption className="mt-3 text-sm">Live TV</figcaption></figure>
<figure><Image src="/work/nasiye-v2-categories.jpg" alt="Categories" width={1600} height={1200} className="h-auto w-full rounded-xl" /><figcaption className="mt-3 text-sm">Categories</figcaption></figure>
<figure><Image src="/work/nasiye-v2-title-page.jpg" alt="Title page" width={1600} height={1200} className="h-auto w-full rounded-xl" /><figcaption className="mt-3 text-sm">Title page</figcaption></figure>
<figure><Image src="/work/nasiye-v2-kids.jpg" alt="Kids section" width={1600} height={1200} className="h-auto w-full rounded-xl" /><figcaption className="mt-3 text-sm">Kids section</figcaption></figure>
</section></main>;
}
