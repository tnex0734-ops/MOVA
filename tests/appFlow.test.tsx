import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ConfirmationDrawer } from '../src/components/drawer/ConfirmationDrawer';
import { SparkModal } from '../src/components/vibe/SparkModal';
import { DropModal } from '../src/components/drops/DropModal';
import { MemoryModal } from '../src/components/memories/MemoryModal';
import { INITIAL_MOMENTS } from '../src/data/mockMoments';
import { INITIAL_DROPS } from '../src/data/mockDrops';
import { INITIAL_MEMORIES } from '../src/data/mockMemories';
import { ToastProvider } from '../src/components/common/Toast';

describe('MOVA Core Component Flows & Modal Dialogs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders ConfirmationDrawer when open and triggers onConfirm upon arrival submission', () => {
    const onConfirm = vi.fn();
    const onClose = vi.fn();
    const testMoment = INITIAL_MOMENTS[0];

    render(
      <ToastProvider>
        <ConfirmationDrawer
          isOpen={true}
          moment={testMoment}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      </ToastProvider>
    );

    // Verify moment title heading is rendered in the drawer
    expect(screen.getByRole('heading', { level: 2, name: new RegExp(testMoment.title, 'i') })).toBeInTheDocument();

    // Find and click the confirm button
    const confirmBtn = screen.getByRole('button', { name: /CONFIRM ARRIVAL/i });
    expect(confirmBtn).toBeInTheDocument();
    fireEvent.click(confirmBtn);

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledWith(testMoment, expect.objectContaining({
      type: 'photo',
    }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders SparkModal and validates title input boundaries', () => {
    const onCreate = vi.fn();
    const onClose = vi.fn();

    const { container } = render(
      <SparkModal
        isOpen={true}
        onClose={onClose}
        onCreateMoment={onCreate}
        defaultVibeId="chill"
        initialTitle=""
      />
    );

    // Verify modal header is visible
    expect(screen.getByText(/Spark a Moment/i)).toBeInTheDocument();

    // Verify title input exists by label
    const titleInput = screen.getByLabelText(/What is happening\?/i);
    expect(titleInput).toBeInTheDocument();

    // Attempting form submission without inputs triggers title validation error
    const form = container.querySelector('form')!;
    fireEvent.submit(form);

    expect(onCreate).not.toHaveBeenCalled();
    expect(screen.getByText(/Moment title cannot be empty/i)).toBeInTheDocument();
  });

  it('renders DropModal for active synchronized drop and allows viewing prompt', () => {
    const onSubmit = vi.fn();
    const onClose = vi.fn();
    const testDrop = INITIAL_DROPS[0];

    render(
      <DropModal
        isOpen={true}
        drop={testDrop}
        onClose={onClose}
        onSubmitContribution={onSubmit}
      />
    );

    // Verify drop prompt heading is displayed via flexible substring matcher
    expect(screen.getByText((content) => content.includes(testDrop.prompt))).toBeInTheDocument();

    // Close button triggers onClose
    const closeBtn = screen.getByLabelText(/Close drop modal/i);
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders MemoryModal and displays archival polaroid metadata', () => {
    const onClose = vi.fn();
    const testMemory = INITIAL_MEMORIES[0];

    render(
      <MemoryModal
        isOpen={true}
        memory={testMemory}
        onClose={onClose}
      />
    );

    // Verify memory title is rendered
    expect(screen.getByText(testMemory.title)).toBeInTheDocument();

    // Close button calls onClose
    const closeBtn = screen.getByLabelText(/Close memory modal/i);
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
