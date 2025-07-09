import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Calculator, Binary, TrendingUp, Hash, Info, Github } from 'lucide-react';
import { 
  calculateRequiredLeadingBinaryZeroes, 
  calculateDifficultyFromLeadingZeroes,
  calculateTargetFromDifficulty,
  formatTargetAsHex,
  formatTargetAsBinary,
  countLeadingZeroes,
  formatDifficulty,
  parseDifficulty,
  formatLargeNumber,
  DIFFICULTY_UNITS,
  type DifficultyUnit
} from '@/lib/bitcoin-utils';

export default function BitcoinDifficultyConverter() {
  const [difficultyInput, setDifficultyInput] = useState('88.40');
  const [difficultyUnit, setDifficultyUnit] = useState<DifficultyUnit>('T');
  const [leadingZeroesInput, setLeadingZeroesInput] = useState('70');
  const [isUpdatingFromDifficulty, setIsUpdatingFromDifficulty] = useState(true);

  // Calculate actual difficulty from input and unit
  const actualDifficulty = parseDifficulty(difficultyInput, difficultyUnit);

  // Update leading zeroes when difficulty changes
  useEffect(() => {
    if (isUpdatingFromDifficulty && actualDifficulty > 0) {
      try {
        const zeroes = calculateRequiredLeadingBinaryZeroes(actualDifficulty);
        setLeadingZeroesInput(zeroes.toString());
      } catch (error) {
        console.error('Error calculating leading zeroes:', error);
      }
    }
  }, [actualDifficulty, isUpdatingFromDifficulty]);

  // Update difficulty when leading zeroes changes
  useEffect(() => {
    if (!isUpdatingFromDifficulty) {
      const zeroes = parseInt(leadingZeroesInput);
      if (!isNaN(zeroes) && zeroes >= 0 && zeroes < 256) {
        try {
          const difficulty = calculateDifficultyFromLeadingZeroes(zeroes);
          if (isFinite(difficulty)) {
            const formatted = formatDifficulty(difficulty, difficultyUnit);
            setDifficultyInput(formatted);
          }
        } catch (error) {
          console.error('Error calculating difficulty:', error);
        }
      }
    }
  }, [leadingZeroesInput, isUpdatingFromDifficulty, difficultyUnit]);

  const handleDifficultyChange = (value: string) => {
    setDifficultyInput(value);
    setIsUpdatingFromDifficulty(true);
  };

  const handleLeadingZeroesChange = (value: string) => {
    setLeadingZeroesInput(value);
    setIsUpdatingFromDifficulty(false);
  };

  const handleUnitChange = (unit: DifficultyUnit) => {
    // Convert current difficulty to new unit
    const currentDifficulty = parseDifficulty(difficultyInput, difficultyUnit);
    const newFormatted = formatDifficulty(currentDifficulty, unit);
    setDifficultyUnit(unit);
    setDifficultyInput(newFormatted);
  };

  return (
    <div className="min-h-screen bg-gradient-crypto-bg p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-bitcoin rounded-xl shadow-crypto">
              <Calculator className="h-8 w-8 text-crypto-dark" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-bitcoin bg-clip-text text-transparent">
              Bitcoin Difficulty Converter
            </h1>
            <a 
              href="https://github.com/pRizz/binary-difficulty-visualizer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
            >
              <Github className="h-6 w-6 text-foreground" />
            </a>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Convert between Bitcoin network difficulty values and their binary representation. 
            Understand the relationship between mining difficulty and required leading zero bits.
          </p>
        </div>

        {/* Main Converter */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Difficulty Input */}
          <Card className="border-crypto-border bg-crypto-card shadow-crypto animate-fade-in">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-bitcoin-orange" />
                <CardTitle className="text-foreground">Network Difficulty</CardTitle>
              </div>
              <CardDescription>
                Current Bitcoin mining difficulty with unit selection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="difficulty" className="text-foreground mb-2 block">
                    Difficulty Value
                  </Label>
                  <Input
                    id="difficulty"
                    type="number"
                    value={difficultyInput}
                    onChange={(e) => handleDifficultyChange(e.target.value)}
                    className="bg-background border-crypto-border text-foreground focus:ring-bitcoin-orange"
                    placeholder="Enter difficulty value"
                  />
                </div>
                <div className="w-24">
                  <Label htmlFor="unit" className="text-foreground mb-2 block">
                    Unit
                  </Label>
                  <Select value={difficultyUnit} onValueChange={handleUnitChange}>
                    <SelectTrigger className="bg-background border-crypto-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-crypto-card border-crypto-border">
                      {Object.entries(DIFFICULTY_UNITS).map(([key, unit]) => (
                        <SelectItem key={key} value={key} className="text-foreground hover:bg-secondary">
                          {key === 'units' ? 'Units' : key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator className="bg-crypto-border" />
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Full Difficulty Value</Label>
                <div className="p-3 bg-background rounded-lg border border-crypto-border">
                  <code className="text-sm text-bitcoin-orange font-mono">
                    {actualDifficulty.toLocaleString()}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leading Zeroes Input */}
          <Card className="border-crypto-border bg-crypto-card shadow-crypto animate-fade-in">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Binary className="h-5 w-5 text-bitcoin-gold" />
                <CardTitle className="text-foreground">Leading Binary Zeroes</CardTitle>
              </div>
              <CardDescription>
                Number of leading zero bits required in valid hash
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="zeroes" className="text-foreground mb-2 block">
                  Required Leading Zeroes
                </Label>
                <Input
                  id="zeroes"
                  type="number"
                  min="0"
                  max="255"
                  value={leadingZeroesInput}
                  onChange={(e) => handleLeadingZeroesChange(e.target.value)}
                  className="bg-background border-crypto-border text-foreground focus:ring-bitcoin-gold"
                  placeholder="Enter number of leading zeroes"
                />
              </div>

              <Separator className="bg-crypto-border" />

              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Hash Probability</Label>
                <div className="p-3 bg-background rounded-lg border border-crypto-border">
                  <code className="text-sm text-bitcoin-gold font-mono">
                    1 in {Math.pow(2, parseInt(leadingZeroesInput) || 0).toLocaleString()}
                  </code>
                </div>
                <div className="p-3 bg-background rounded-lg border border-crypto-border">
                  <code className="text-sm text-accent font-mono">
                    1 in {formatLargeNumber(Math.pow(2, parseInt(leadingZeroesInput) || 0))}
                  </code>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Target Hash Section */}
        <Card className="border-crypto-border bg-crypto-card shadow-crypto animate-fade-in">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-accent" />
              <CardTitle className="text-foreground">Target Hash Threshold</CardTitle>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </TooltipTrigger>
                <TooltipContent className="max-w-md p-4 bg-crypto-card border-crypto-border">
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold">Target Calculation Algorithm:</p>
                    <div className="space-y-1 font-mono text-xs">
                      <p>1. target = genesis_target / difficulty</p>
                      <p>2. genesis_target = nBitsToTarget(0x1d00ffff)</p>
                      <p>3. nBits format: [exponent][coefficient]</p>
                      <p>4. result = coefficient × 2^(8×(exponent-3))</p>
                    </div>
                    <p className="text-muted-foreground">
                      A valid Bitcoin hash must be numerically less than this target value.
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
            <CardDescription>
              Maximum hash value that will be accepted by the Bitcoin network
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Target (Hexadecimal)</Label>
              <div className="p-3 bg-background rounded-lg border border-crypto-border">
                <code className="text-xs text-accent font-mono break-all">
                  {(() => {
                    try {
                      const target = calculateTargetFromDifficulty(actualDifficulty);
                      return formatTargetAsHex(target);
                    } catch (error) {
                      return '0x0000000000000000000000000000000000000000000000000000000000000000';
                    }
                  })()}
                </code>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Target (Decimal)</Label>
              <div className="p-3 bg-background rounded-lg border border-crypto-border">
                <code className="text-xs text-accent font-mono break-all">
                  {(() => {
                    try {
                      const target = calculateTargetFromDifficulty(actualDifficulty);
                      return target.toString();
                    } catch (error) {
                      return '0';
                    }
                  })()}
                </code>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Target (Binary)</Label>
              <div className="p-3 bg-background rounded-lg border border-crypto-border">
                <code className="text-xs text-accent font-mono break-all leading-relaxed">
                  {(() => {
                    try {
                      const target = calculateTargetFromDifficulty(actualDifficulty);
                      const leadingZeroes = countLeadingZeroes(target);
                      return (
                        <div className="space-y-1">
                          <div>{formatTargetAsBinary(target)}</div>
                          <div className="text-muted-foreground text-xs">
                            ({leadingZeroes} leading zeroes)
                          </div>
                        </div>
                      );
                    } catch (error) {
                      return '0000000000000000000000000000000000000000000000000000000000000000';
                    }
                  })()}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-4 animate-fade-in">
          <Card className="border-crypto-border bg-crypto-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-bitcoin-orange mb-1">
                {parseInt(leadingZeroesInput) || 0}
              </div>
              <div className="text-sm text-muted-foreground">Leading Zeroes</div>
            </CardContent>
          </Card>
          
          <Card className="border-crypto-border bg-crypto-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-bitcoin-gold mb-1">
                {Math.log2(actualDifficulty || 1).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Log₂ Difficulty</div>
            </CardContent>
          </Card>
          
          <Card className="border-crypto-border bg-crypto-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent mb-1">
                {((parseInt(leadingZeroesInput) || 0) / 256 * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Zeroes Ratio</div>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="border-crypto-border bg-crypto-card animate-fade-in">
          <CardHeader>
            <CardTitle className="text-foreground">How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Bitcoin mining difficulty determines how many leading zero bits are required in a valid block hash. 
              Higher difficulty means more leading zeroes are needed, making valid hashes exponentially harder to find.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Bidirectional Conversion</Badge>
              <Badge variant="secondary">Real-time Updates</Badge>
              <Badge variant="secondary">Unit Scaling</Badge>
              <Badge variant="secondary">Probability Calculation</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center py-6 text-muted-foreground text-sm space-y-2">
          <p>
            Learn more about bitcoin mining and try bitcoin mining in your web browser at{' '}
            <a 
              href="https://www.win3bitco.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-bitcoin-orange hover:text-bitcoin-gold transition-colors underline"
            >
              win3bitco.in
            </a>
          </p>
          <p>Vibe coded by Peter Ryszkiewicz and lovable.dev</p>
        </footer>
      </div>
    </div>
  );
}