import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, url, description, category } = body;

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const link = await prisma.link.create({
      data: {
        title,
        url,
        description,
        category,
        userId: user.id,
      },
    });

    return NextResponse.json(link);
  } catch (error) {
    console.error("[LINKS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      include: {
        links: {
          orderBy: {
            savedAt: "desc",
          },
        },
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(user.links);
  } catch (error) {
    console.error("[LINKS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { linkId } = body;

    if (!linkId) {
      return new NextResponse("Incorrect linkId", { status: 400 });
    }

    const link = await prisma.link.findUnique({
      where: { id: linkId },
    });

    if (!link) {
      return new NextResponse("Link not found", { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user || link.userId !== user.id) {
      return new NextResponse("Unauthorized to delete this link", {
        status: 403,
      });
    }

    await prisma.link.delete({
      where: { id: linkId },
    });

    return new NextResponse("Link deleted successfully", { status: 200 });
  } catch (error) {
    console.error("[LINKS_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { linkId, category } = body;

    if (!linkId) {
      return new NextResponse("Missing linkId", { status: 400 });
    }

    const link = await prisma.link.findUnique({
      where: { id: linkId },
    });

    if (!link) {
      return new NextResponse("Link not found", { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user || link.userId !== user.id) {
      return new NextResponse("Unauthorized to update this link", {
        status: 403,
      });
    }

    const updatedLink = await prisma.link.update({
      where: { id: linkId },
      data: { category },
    });

    return NextResponse.json(updatedLink);
  } catch (error) {
    console.error("[LINKS_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
