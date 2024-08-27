import PlantIdentifier from '@/components/PlantIdentifier';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-green-800">Plant Identifier</h1>
      <PlantIdentifier />
    </main>
  );
}