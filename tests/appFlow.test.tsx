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

  it('supports scheduling a moment with date and time in SparkModal', () => {
    const onCreate = vi.fn();
    const onClose = vi.fn();

    const { container } = render(
      <SparkModal
        isOpen={true}
        onClose={onClose}
        onCreateMoment={onCreate}
        defaultVibeId="play"
        initialTitle=""
      />
    );

    // Switch from Happening Now to Schedule Ahead
    const scheduleToggleBtn = screen.getByText(/Schedule Ahead/i);
    fireEvent.click(scheduleToggleBtn);

    // Verify scheduled date & time controls are visible
    expect(screen.getByText(/Scheduled Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Time/i)).toBeInTheDocument();

    // Select "Tomorrow"
    const tomorrowBtn = screen.getByRole('button', { name: /Tomorrow/i });
    fireEvent.click(tomorrowBtn);

    // Select "6:00 PM"
    const timeBtn = screen.getByRole('button', { name: /6:00 PM/i });
    fireEvent.click(timeBtn);

    // Fill in title and location
    const titleInput = screen.getByLabelText(/What is happening\?/i);
    fireEvent.change(titleInput, { target: { value: 'Acoustic Rooftop Jam' } });

    const locationInput = screen.getByLabelText(/Exact Spot/i);
    fireEvent.change(locationInput, { target: { value: 'Hostel 4 Rooftop' } });

    // Submit the form
    const form = container.querySelector('form')!;
    fireEvent.submit(form);

    expect(onCreate).toHaveBeenCalledTimes(1);
    const createdMoment = onCreate.mock.calls[0][0];
    expect(createdMoment.isScheduled).toBe(true);
    expect(createdMoment.scheduledDate).toBe('Tomorrow');
    expect(createdMoment.scheduledTime).toBe('6:00 PM');
    expect(createdMoment.title).toBe('Acoustic Rooftop Jam');
    expect(createdMoment.location).toBe('Hostel 4 Rooftop');
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
