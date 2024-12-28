import { type NextRequest, NextResponse } from "next/server";
import { v2 as Cloudinary } from "cloudinary";
import {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_PRESET,
} from "@/utils/config";
import { getErrorMessage } from "@/utils/funckage";

Cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});
// Upload
export async function POST(req: NextRequest) {
  try {
    const { image, sector, file_name } = await req.json();
    console.log({ sector });
    const NOW = Date.now()
    // image can be a link or file
    const uploadResponse = await Cloudinary.uploader.upload(image, {
      upload_preset: CLOUDINARY_PRESET,
      public_id: `${sector}-${file_name}-${NOW}`
    });
    console.log({ uploadResponse });

    return NextResponse.json({ success: true, data: uploadResponse, message: "image uploaded success" });
  } catch (error: any) {
    console.log({ error });
    const message = getErrorMessage(error)
    return NextResponse.json({ message, success: false, data: null }, { status: 401 })
  }
}

// Optimize
export async function PUT(req: NextRequest) {
  try {
    const { public_id } = await req.json();

    const optimizeUrl = Cloudinary.url(public_id, {
      fetch_format: 'auto',
      quality: 'auto'
    });

    return NextResponse.json(optimizeUrl);
  } catch (error: any) {
    return NextResponse.json(error);
  }
}

// Transform
export async function PATCH(req: NextRequest) {
  try {
    const { public_id } = await req.json();

    const autoCropUrl = Cloudinary.url(public_id, {
      crop: 'auto',
      gravity: 'auto',
      width: 500,
      height: 500,
    });

    return NextResponse.json(autoCropUrl);
  } catch (error: any) {
    return NextResponse.json(error);
  }
}

