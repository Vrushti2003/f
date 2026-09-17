import { ProblemSpec, RoundId, PowerCardState } from './types';

export const ROUND_SPECS: Record<RoundId, ProblemSpec> = {
  round1_a: {
    id: 'round1_a',
    roundTitle: 'ROUND 1',
    activityTitle: 'Activity A: Dumb Charades + Code',
    durationMinutes: 15,
    maxPoints: 50,
    description: `One team member will act out the given movie using gestures, and the other team member must identify it and write the required C program.`,
    constraints: [],
    sampleInput: '',
    sampleOutput: '',
    explanation: '',
    starterCode: `#include <stdio.h>

int main() {
    // Write your C program here
    
    return 0;
}
`,
    testCases: []
  },

  round1_b: {
    id: 'round1_b',
    roundTitle: 'ROUND 1',
    activityTitle: 'Activity B: Check Even/Odd Number',
    durationMinutes: 15,
    maxPoints: 50,
    description: `Check Even/Odd Number Using C Programming

Problem Statement:
Write a C program to check whether a given integer is Even or Odd.

Input:
A single integer N.

Output:
Print "Even" if N is even.
Print "Odd" if N is odd.

Example:
Input: 10
Output: Even

Input: 7
Output: Odd`,
    constraints: [
      'Input: Single integer N via standard input',
      'Output matches exact case: "Even" or "Odd"',
      'Time Limit: 2.5 seconds per test case'
    ],
    sampleInput: `10`,
    sampleOutput: `Even`,
    explanation: '10 is divisible by 2 with no remainder, so it is Even.',
    starterCode: '',
    testCases: [
      {
        input: `10`,
        expectedOutput: `Even\n`,
        description: 'Sample 1: Even integer (10)'
      },
      {
        input: `7`,
        expectedOutput: `Odd\n`,
        description: 'Sample 2: Odd integer (7)'
      },
      {
        input: `0`,
        expectedOutput: `Even\n`,
        description: 'Test 3: Zero is Even (0)'
      },
      {
        input: `42`,
        expectedOutput: `Even\n`,
        description: 'Test 4: Even integer (42)'
      },
      {
        input: `99`,
        expectedOutput: `Odd\n`,
        description: 'Test 5: Odd integer (99)'
      }
    ]
  },

  round2: {
    id: 'round2',
    roundTitle: 'ROUND 2',
    activityTitle: 'Debugging Challenge',
    durationMinutes: 20,
    maxPoints: 100,
    description: 'Debug the given C program and fix the errors.',
    constraints: [],
    sampleInput: '',
    sampleOutput: '',
    explanation: '',
    starterCode: `#include <stdio.h>

FLOAT average(int total, int n)
{
    return total / n;
}

int findMax(int a[], int n)
{
    int max = a[0], i;

    for (i = 1; i < n; i++);
    {
        if (a[i] > max)
        {
            max = a[i];
                            
    }

    return max;
}

void reverse(int a[], int n)
{
    int i, temp;

    for (i = 0; i < n / 2; i++)
    {
        temp == a[i]; 
        a[i] = a[n - i - 1];
        a[n - i - 1] = temp;
    }
}

int saerch(int a, int n, int key) 
{
    int i;

    for (i = 0; i < n; i++)
    {
        if (a[i] = key) 
            return i;
    }

    return -1;
}

int main()
{
    int a[8], i, key;
    int total = 0, max, pos;
    float avg;

    print("Enter 8 numbers:\\n"); 

    for (i = 0; i < 8; i++)
    {
        scanf("%d", %a[i]); 
        total += a[i]:    
    }

    max = findmax(a, 8); 
    avg = average(total, 8);

    printf("\\nTotal = %d\\n", total);
    printf("Average = %d\\n", avg); 
    printf("Maximum = %d\\n", max);

    printf("\\nEnter number to search: ");
    scanf("%d", &key);

    pos = search(a, 8, key);

    if (pos != -1)
        printf("Found at position %d\\n", pos + 1);
    else
        printf("Number not found\\n");

    reverse(a, 8);

    printf("Reversed array: ");

    for (i = 0; i < 8; i++)
    {
        printf("%d ", a[j]); 
    }

    printf("\\n");

    return 0;
}
}
`,
    testCases: [
      {
        input: `10 20 30 40 50 60 70 80\n50`,
        expectedOutput: `Enter 8 numbers:\n\nTotal = 360\nAverage = 45\nMaximum = 80\n\nEnter number to search: Found at position 5\nReversed array: 80 70 60 50 40 30 20 10`,
        description: 'Test 1: Search element found'
      },
      {
        input: `8 7 6 5 4 3 2 1\n99`,
        expectedOutput: `Enter 8 numbers:\n\nTotal = 36\nAverage = 4\nMaximum = 8\n\nEnter number to search: Number not found\nReversed array: 1 2 3 4 5 6 7 8`,
        description: 'Test 2: Search element not found'
      }
    ]
  },

  round3: {
    id: 'round3',
    roundTitle: 'ROUND 3',
    activityTitle: 'Hollow Hexagon Pattern',
    durationMinutes: 30,
    maxPoints: 150,
    description: `Write a C program to print the following Hollow Hexagon pattern using asterisks (*).

The output must match the following pattern exactly, including spacing and alignment.

EXPECTED PATTERN:

    *****
   *     *
  *       *
 *         *
  *       *
   *     *
    *****`,
    constraints: [
      'The output must match the pattern exactly, including spacing and alignment',
      'Time Limit: 2.5 seconds per test case'
    ],
    sampleInput: '',
    sampleOutput: `    *****\n   *     *\n  *       *\n *         *\n  *       *\n   *     *\n    *****`,
    explanation: '',
    starterCode: `#include <stdio.h>

int main() {
    // Write your C program here to print the Hollow Hexagon pattern:
    
    return 0;
}
`,
    testCases: [
      {
        input: ``,
        expectedOutput: `    *****\n   *     *\n  *       *\n *         *\n  *       *\n   *     *\n    *****\n`,
        description: 'Test 1: Exact Hollow Hexagon Pattern'
      }
    ]
  }
};

export const AVAILABLE_POWER_CARDS: PowerCardState[] = [
  {
    cardId: 'flashbang',
    name: 'Flashbang',
    description: 'Imposes an active modified constraint on the team editor for testing adaptability.',
    icon: 'EyeOff',
    isPositive: false,
    costPoints: 20
  },
  {
    cardId: 'freeze',
    name: 'Keyboard Freeze',
    description: 'Locks the C code editor for exactly 2 minutes (120 seconds). Timer continues running!',
    icon: 'Snowflake',
    isPositive: false,
    costPoints: 40
  },
  {
    cardId: 'shield',
    name: 'Shield',
    description: 'Protects the team by deflecting and nullifying the next negative Power Card.',
    icon: 'Shield',
    isPositive: true,
    costPoints: 30
  },
  {
    cardId: 'timewarp',
    name: 'Time Warp (-5m)',
    description: 'Penalizes team by subtracting 5 minutes (300 seconds) from the remaining countdown.',
    icon: 'ClockBackward',
    isPositive: false,
    costPoints: 35
  },
  {
    cardId: 'turboboost',
    name: 'Turbo Boost (+5m)',
    description: 'Grants 5 bonus minutes (300 seconds) to the remaining Round 3 countdown timer.',
    icon: 'Zap',
    isPositive: true,
    costPoints: 25
  }
];

export const TEAMS_LIST = Array.from({ length: 22 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `Team ${num}`;
});
