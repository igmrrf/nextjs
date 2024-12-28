"use client";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

// Public_ids from your Cloudinary accout
const cloudinary_names = [
    "samples/animals/cat",
    "giftcards/zqyd0ngnipltgeiamaai",
    "samples/animals/three-dogs",
];

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function Page() {
    return (
        <main className="flex flex-col gap-6 md:gap-8 row-start-2 items-center sm:items-start">
            <div className="flex flex-col">
                <h2>PNG/JPG/JPEG/WEBP</h2>
                <div className="flex flex-wrap">
                    {cloudinary_names.map((name) => (
                        <CldImage
                            key={name}
                            alt={name} // with this you don't need to configure res.cloudinary.com domain
                            src={name} // Use this sample image or upload your own via the Media Explorer
                            width="400" // Transform the image: auto-crop to square aspect_ratio
                            height="400"
                            crop={{
                                type: "auto",
                                source: true,
                            }}
                        />
                    ))}
                </div>
            </div>
            <div>
                <h2>GIF</h2>
                <Image
                    src={
                        "https://res.cloudinary.com/ds83j91lr/image/upload/f_auto,q_auto/v1/samples/animals/kitten-playing"
                    }
                    height={400}
                    width={400}
                    alt={"A cute animal!"}
                    unoptimized={true}
                />
            </div>
        </main>
    );
}
