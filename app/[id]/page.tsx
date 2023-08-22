export default function ItemPage({ params }: { params: { id: number } }) {
  return (
    <main>
      <h1 className="title-mega">{params.id}</h1>
    </main>
  );
}
