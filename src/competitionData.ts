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
    starterCode: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    
    // Write your code here to check whether n is Even or Odd:
    
    return 0;
}
`,
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
    description: `Analyze and debug the given C program.

The program performs array operations:
1. Prompts for and reads 8 integers into an array.
2. Calculates and displays the total (sum), average, and maximum of the numbers.
3. Prompts for an integer to search for and prints its 1-based position, or displays "Number not found".
4. Reverses the array and displays the reversed numbers.

Examine the code carefully, identify and fix all syntax, compilation, logic, and runtime errors so that the program runs correctly.
Note: In Round 2, the "Run Code" button is disabled. Review your fixes directly and click "SUBMIT CODE" when ready.`,
    constraints: [
      'Array size is fixed at 8 integers',
      'Preserve the original program structure and function declarations',
      'The code runner is disabled in Round 2 — inspect thoroughly and submit when ready'
    ],
    sampleInput: `10 20 30 40 50 60 70 80
50`,
    sampleOutput: `Enter 8 numbers:

Total = 360
Average = 45
Maximum = 80

Enter number to search: Found at position 5
Reversed array: 80 70 60 50 40 30 20 10`,
    explanation: 'The program reads 8 numbers, prints their total (sum), average, maximum, searches for key 50 at 1-based position 5, and prints the reversed array.',
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
    activityTitle: 'Final Coding Race: Print the Given Star Pattern',
    durationMinutes: 30,
    maxPoints: 150,
    description: `FINAL CODING RACE: Print the Given Star Pattern

Write a C program to display the exact star pattern shown below using nested loops.
First team to submit a correct solution wins the race!

REFERENCE STAR PATTERN:
    *
   ***
  *****
 *******
*********
 *******
  *****
   ***
    *

PATTERN STRUCTURE:
Row 1: 4 leading spaces + 1 star
Row 2: 3 leading spaces + 3 stars
Row 3: 2 leading spaces + 5 stars
Row 4: 1 leading space + 7 stars
Row 5: 0 leading spaces + 9 stars
Row 6: 1 leading space + 7 stars
Row 7: 2 leading spaces + 5 stars
Row 8: 3 leading spaces + 3 stars
Row 9: 4 leading spaces + 1 star

INPUT INSTRUCTIONS:
- You may read N from standard input (where N = 5 for this pattern), OR use loops to generate the 5-row diamond directly.
- Both methods are fully accepted!
- Standard test input supplies: 5`,
    constraints: [
      'Students must use loops (for / while) to generate the pattern',
      'Total pattern height is 9 rows (upper pyramid has N = 5 rows)',
      'Output matches the exact row alignment and star counts',
      'Time Limit: 2.5 seconds per test case'
    ],
    sampleInput: `5`,
    sampleOutput: `    *
   ***
  *****
 *******
*********
 *******
  *****
   ***
    *`,
    explanation: 'Symmetric diamond pattern with N = 5 rows in the upper half and 4 rows in the lower half.',
    starterCode: `#include <stdio.h>

int main() {
    int n = 5;
    // Optional: read n from input:
    // scanf("%d", &n);

    // Write your nested loop logic below to print the star pattern:
    
    return 0;
}
`,
    testCases: [
      {
        input: `5`,
        expectedOutput: `    *\n   ***\n  *****\n *******\n*********\n *******\n  *****\n   ***\n    *\n`,
        description: 'Reference Pattern: N = 5 Diamond'
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
