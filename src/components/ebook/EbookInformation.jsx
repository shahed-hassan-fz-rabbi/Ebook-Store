"use client";

export default function EbookInformation({ ebook }) {

  const infos = [
    ["Author", ebook.writer],
    ["Genre", ebook.genre],
    ["Language", "English"],
    ["Pages", "325"],
    ["Format", "PDF"],
    ["Rating", ebook.rating],
    ["Downloads", ebook.sold],
  ];

  return (
    <section className="pb-20">

      <div className="container">

        <div
          className="rounded-3xl overflow-hidden"
          style={{
            border: "1px solid var(--border)",
          }}
        >

          <table className="w-full">

            <tbody>

              {infos.map(([label, value]) => (

                <tr
                  key={label}
                  className="border-b"
                  style={{
                    borderColor: "var(--border)",
                  }}
                >
                  <td
                    className="font-semibold p-5 w-52"
                    style={{
                      background: "var(--card)",
                      color: "var(--brand)",
                    }}
                  >
                    {label}
                  </td>

                  <td
                    className="p-5"
                    style={{
                      color: "var(--muted)",
                    }}
                  >
                    {value}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </section>
  );
}