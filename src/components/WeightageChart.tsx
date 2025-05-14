import { useEffect, useRef } from 'react';

interface ChartComponentProps {
  name: string;
  value: number;
  maxValue: number;
}

interface WeightageChartProps {
  components: ChartComponentProps[];
}

export const WeightageChart = ({ components }: WeightageChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const colorPalette = [
    { background: 'rgba(59, 130, 246, 0.7)', border: 'rgb(37, 99, 235)' },
    { background: 'rgba(99, 102, 241, 0.7)', border: 'rgb(79, 70, 229)' },
    { background: 'rgba(139, 92, 246, 0.7)', border: 'rgb(124, 58, 237)' },
    { background: 'rgba(236, 72, 153, 0.7)', border: 'rgb(219, 39, 119)' },
    { background: 'rgba(249, 115, 22, 0.7)', border: 'rgb(234, 88, 12)' },
    { background: 'rgba(16, 185, 129, 0.7)', border: 'rgb(5, 150, 105)' }
  ];

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Define chart dimensions
    const chartWidth = canvas.width;
    const chartHeight = canvas.height;
    const barWidth = chartWidth / components.length * 0.6;
    const spacing = chartWidth / components.length * 0.4;
    const maxBarHeight = chartHeight * 0.75;

    // Draw grid lines
    ctx.strokeStyle = 'rgba(156, 163, 175, 0.2)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 5; i++) {
      const y = chartHeight - (i * maxBarHeight / 5) - (chartHeight * 0.15);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartWidth, y);
      ctx.stroke();
      
      // Add grid line labels
      ctx.fillStyle = 'rgba(156, 163, 175, 0.8)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${i * 20}%`, 5, y - 5);
    }

    // Draw bars
    components.forEach((component, index) => {
      const x = (index * (barWidth + spacing)) + spacing / 2;
      const percentHeight = (component.value / component.maxValue);
      const barHeight = percentHeight * maxBarHeight;
      const y = chartHeight - barHeight - (chartHeight * 0.15);
      
      // Draw bar
      ctx.fillStyle = colorPalette[index % colorPalette.length].background;
      ctx.strokeStyle = colorPalette[index % colorPalette.length].border;
      ctx.lineWidth = 2;
      
      // Rounded top rect
      const radius = 4;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + barWidth - radius, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
      ctx.lineTo(x + barWidth, chartHeight - (chartHeight * 0.15));
      ctx.lineTo(x, chartHeight - (chartHeight * 0.15));
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Add value labels
      ctx.fillStyle = colorPalette[index % colorPalette.length].border;
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(component.value.toFixed(1), x + barWidth / 2, y - 10);
      
      // Add component name labels
      ctx.fillStyle = 'rgba(75, 85, 99, 0.9)';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(component.name, x + barWidth / 2, chartHeight - (chartHeight * 0.05));
    });

  }, [components]);

  return (
    <canvas 
      ref={canvasRef} 
      width={500} 
      height={250}
      className="w-full h-full"
    ></canvas>
  );
};