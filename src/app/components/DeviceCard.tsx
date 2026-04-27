import { Device } from '../data/mockDevices';
import { Card } from './ui/card';
import { Battery, Signal, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DeviceCardProps {
  device: Device;
  onClick: () => void;
}

export function DeviceCard({ device, onClick }: DeviceCardProps) {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  const batteryColor =
    device.battery > 60 ? 'text-green-600' :
    device.battery > 30 ? 'text-yellow-600' :
    'text-red-600';

  const signalColor =
    device.signal > 70 ? 'text-green-600' :
    device.signal > 40 ? 'text-yellow-600' :
    'text-red-600';

  return (
    <Card
      className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${statusColors[device.status]}`} />
            <div>
              <h3 className="font-semibold">{device.name}</h3>
              <p className="text-sm text-muted-foreground">{device.type}</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {device.id}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Battery className={`w-4 h-4 ${batteryColor}`} />
            <span className={batteryColor}>{device.battery}%</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Signal className={`w-4 h-4 ${signalColor}`} />
            <span className={signalColor}>{device.signal}%</span>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{formatDistanceToNow(device.lastSeen, { addSuffix: true })}</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          {device.location.address}
        </div>
      </div>
    </Card>
  );
}
