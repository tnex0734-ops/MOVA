import { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from './Button';
import { Icon3D } from './Icon3D';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log internally without exposing sensitive stack details to the user
    console.error('[MOVA ErrorBoundary caught error]:', error.message, errorInfo.componentStack);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-screen bg-white text-mova-nearblack flex flex-col items-center justify-center p-6 text-center select-none"
        >
          <div className="w-20 h-20 rounded-full bg-mova-ice-soft flex items-center justify-center text-mova-ocean mb-4 shadow-sm">
            <Icon3D name="spark" size="xl" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-mova-ocean mb-1">
            MOVA System Notice
          </span>
          <h1 className="font-crayon text-3xl sm:text-4xl font-bold text-mova-nearblack mb-2">
            Something went sideways.
          </h1>
          <p className="text-xs text-mova-muted max-w-md leading-relaxed mb-6">
            Don't worry — moments are still happening around you. Try resuming or reload the campus feed.
          </p>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="md"
              onClick={this.handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={this.handleReload}
              className="font-bold shadow-md"
            >
              <span>Reload Campus</span>
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
