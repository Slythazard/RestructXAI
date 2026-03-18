import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const specifications = {
  ultra: {
    name: "Gemini Ultra",
    specs: [
      { label: "Parameters", value: "1T+", description: "Trillion-scale parameters" },
      { label: "Context Length", value: "32K", description: "Tokens" },
      { label: "Languages", value: "100+", description: "Supported languages" },
      { label: "Modalities", value: "5", description: "Text, Image, Video, Audio, Code" },
      { label: "Training Data", value: "2023", description: "Knowledge cutoff" },
      { label: "Safety Rating", value: "99.8%", description: "Harmful content filtered" }
    ]
  },
  pro: {
    name: "Gemini Pro",
    specs: [
      { label: "Parameters", value: "100B+", description: "Billion-scale parameters" },
      { label: "Context Length", value: "32K", description: "Tokens" },
      { label: "Languages", value: "100+", description: "Supported languages" },
      { label: "Modalities", value: "5", description: "Text, Image, Video, Audio, Code" },
      { label: "Training Data", value: "2023", description: "Knowledge cutoff" },
      { label: "Latency", value: "<1s", description: "Average response time" }
    ]
  },
  nano: {
    name: "Gemini Nano",
    specs: [
      { label: "Parameters", value: "1.8B", description: "Optimized for efficiency" },
      { label: "Context Length", value: "8K", description: "Tokens" },
      { label: "Languages", value: "50+", description: "Core languages" },
      { label: "Modalities", value: "3", description: "Text, Image, Code" },
      { label: "Device Size", value: "1.8GB", description: "Model footprint" },
      { label: "Offline", value: "✓", description: "Works without internet" }
    ]
  }
};

const benchmarks = [
  { name: "MMLU", description: "Massive Multitask Language Understanding", score: "90.0%" },
  { name: "HellaSwag", description: "Commonsense reasoning", score: "87.8%" },
  { name: "HumanEval", description: "Code generation", score: "74.4%" },
  { name: "GSM8K", description: "Grade school math", score: "94.4%" },
  { name: "MATH", description: "Mathematical reasoning", score: "53.2%" },
  { name: "DROP", description: "Reading comprehension", score: "82.4%" }
];

export function TechnicalSpecsSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Technical Specifications
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Detailed performance metrics and technical capabilities across all Gemini model variants.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="ultra" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 h-auto p-1">
              <TabsTrigger value="ultra" className="py-3">
                <div className="text-center">
                  <div className="font-semibold">Ultra</div>
                  <div className="text-xs text-muted-foreground">Most Capable</div>
                </div>
              </TabsTrigger>
              <TabsTrigger value="pro" className="py-3">
                <div className="text-center">
                  <div className="font-semibold">Pro</div>
                  <div className="text-xs text-muted-foreground">Most Popular</div>
                </div>
              </TabsTrigger>
              <TabsTrigger value="nano" className="py-3">
                <div className="text-center">
                  <div className="font-semibold">Nano</div>
                  <div className="text-xs text-muted-foreground">Most Efficient</div>
                </div>
              </TabsTrigger>
            </TabsList>

            {Object.entries(specifications).map(([key, spec]) => (
              <TabsContent key={key} value={key} className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{spec.name} Specifications</CardTitle>
                    <CardDescription>
                      Detailed technical specifications and capabilities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {spec.specs.map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-baseline justify-between">
                            <span className="text-sm text-muted-foreground">{item.label}</span>
                            <Badge variant="secondary" className="font-mono">
                              {item.value}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          {/* Benchmarks */}
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Benchmark Performance
            </h3>
            <Card>
              <CardHeader>
                <CardTitle>Gemini Ultra Results</CardTitle>
                <CardDescription>
                  Performance on industry-standard benchmarks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {benchmarks.map((benchmark, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{benchmark.name}</span>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {benchmark.score}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{benchmark.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}