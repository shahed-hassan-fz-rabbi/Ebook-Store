"use client";

import { Star } from "lucide-react";

export default function ReviewSection() {

  return (
    <section className="section-padding">

      <div className="container">

        <h2
          className="text-4xl font-bold mb-10"
          style={{
            color:"var(--brand)"
          }}
        >
          Reader Reviews
        </h2>

        <div
          className="rounded-3xl p-8"
          style={{
            background:"white",
            border:"1px solid var(--border)"
          }}
        >

          <div className="flex gap-2 mb-5">

            {[1,2,3,4,5].map(i=>(

              <Star
                key={i}
                fill="#facc15"
                color="#facc15"
              />

            ))}

          </div>

          <p
            style={{
              color:"var(--muted)"
            }}
          >
            Amazing ebook! The explanations were very practical and easy to
            understand. Highly recommended for beginners.
          </p>

          <h4
            className="mt-5 font-semibold"
            style={{
              color:"var(--brand)"
            }}
          >
            — John Doe
          </h4>

        </div>

      </div>

    </section>
  );
}