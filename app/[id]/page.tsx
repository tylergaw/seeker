export default function ItemPage({ params }: { params: { id: number } }) {
  return (
    <main>
      <h1>Item page for {params.id}</h1>
    </main>
  );
}
