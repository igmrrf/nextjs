"use client";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

// Public_ids from your Cloudinary accout
const cloudinary_names = [
    "samples/animals/cat",
    "giftcards/zqyd0ngnipltgeiamaai",
    "samples/animals/three-dogs",
    "default/avatar-Untitled design.png-1735411571695",
    "samples/animals/reindeer",
];

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function Page() {
    return (
        <div className="flex flex-wrap gap-6 justify-center">
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
    );
}
