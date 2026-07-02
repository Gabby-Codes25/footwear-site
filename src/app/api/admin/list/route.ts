import { NextRequest, NextResponse } from "next/server";
import { isValidSessionToken, SESSION_COOKIE_NAME } from "@/lib/admin-auth";
import { getAllPosts } from "@/lib/posts";

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!isValidSessionToken(sessionToken)) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    publishedAt: p.publishedAt,
    author: p.author,
  }));

  return NextResponse.json({ posts });
}
