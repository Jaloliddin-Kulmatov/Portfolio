# Portfolio with admin panel

**Live:** [portfolio-n5v3.vercel.app](https://portfolio-n5v3.vercel.app) · **Code:** [github.com/Jaloliddin-Kulmatov/Portfolio](https://github.com/Jaloliddin-Kulmatov/Portfolio)

Personal portfolio of Jaloliddin Kulmatov. Edit every text and project from `/admin`. No code changes needed.

- **Public site** (`/`): intro, highlights, about, projects with filters, experience, skills, awards, contact.
- **Admin panel** (`/admin`): password login. Edit profile, links, highlights, projects (add, edit, reorder, delete,
  upload images), experience, skills and awards. Press **Save changes** and the site updates right away.

Built with Next.js 15 (App Router), React 19 and TypeScript. Content is stored as one JSON document in
Neon Postgres. Uploads go to Vercel Blob.

## Run on your Mac

Requires Node.js 22 LTS (<https://nodejs.org>).

```bash
cp .env.example .env.local      # then fill in the values
npm install
npm run dev
```

Open <http://localhost:3000>, and <http://localhost:3000/admin> to edit.

Without `DATABASE_URL` the site shows the built-in content from `src/lib/content.ts`, and the admin panel opens
but can't save.

## Deploy on Vercel (free)

1. Push this folder to a new GitHub repository, for example `portfolio-admin`.
2. In Vercel: **Add New → Project**, import the repository, and press **Deploy**.
3. In the project's **Settings → Environment Variables**, add:
   - `DATABASE_URL`: from Neon (**Dashboard → Connection details**). A free Neon project is enough.
   - `ADMIN_PASSWORD`: a long password only you know.
   - `SESSION_SECRET`: a random string, made with `openssl rand -hex 32`.
4. Optional, for uploads: **Storage → Create → Blob**, and connect it to the project. Vercel adds
   `BLOB_READ_WRITE_TOKEN` for you.
5. Redeploy. Go to `https://<your-site>/admin`, log in, and press **Save changes** once. That copies the built-in
   content into the database. From then on, edit everything there.

The table (`site_content`) is created automatically on the first save.

## Where things are

```
src/lib/content.ts         content types and the starting content
src/lib/db.ts              read/save the content in Neon
src/lib/auth.ts            password check and signed login cookie
src/middleware.ts          protects /admin
src/app/page.tsx           public site
src/components/ProjectGrid.tsx  project cards and filters
src/app/admin/             login page, editor page, server actions (save, upload)
src/components/Editor.tsx  the admin editor
public/                    photo, CV and project screenshots
```

## Security notes

- Only the admin password can save changes. The login cookie is httpOnly, signed and expires after 7 days.
- Saved text is trimmed and length-limited; links must start with `https://`, `http://` or `/`.
- Uploads accept JPG, PNG, WebP, GIF and PDF up to 4 MB.
