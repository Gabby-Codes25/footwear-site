import { NextRequest, NextResponse } from "next/server";
import { isValidSessionToken, SESSION_COOKIE_NAME } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!isValidSessionToken(sessionToken)) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { slug } = await request.json();
  if (!slug) {
    return NextResponse.json({ error: "Missing slug." }, { status: 400 });
  }

  const githubToken = process.env.GITHUB_COMMIT_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!githubToken || !repo) {
    return NextResponse.json(
      { error: "Server is not configured. GITHUB_COMMIT_TOKEN or GITHUB_REPO is missing." },
      { status: 500 }
    );
  }

  const filePath = `src/content/blog/${slug}.mdx`;
  const githubApiUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;

  // GitHub requires the file's current SHA to delete it — fetch that first.
  const fileResponse = await fetch(`${githubApiUrl}?ref=${branch}`, {
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!fileResponse.ok) {
    return NextResponse.json(
      { error: "Could not find that article on GitHub. It may already be deleted." },
      { status: 404 }
    );
  }

  const fileData = await fileResponse.json();

  const deleteResponse = await fetch(githubApiUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Delete article: ${slug}`,
      sha: fileData.sha,
      branch,
    }),
  });

  if (!deleteResponse.ok) {
    const errorData = await deleteResponse.json().catch(() => ({}));
    return NextResponse.json(
      { error: `GitHub delete failed: ${errorData.message || deleteResponse.statusText}` },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
