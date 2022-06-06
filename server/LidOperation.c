#include "mcc_generated_files/system.h"
#include <time.h>

int k;

void _ISRFAST _T3Interrupt (void)
{
    k++;
    _T3IF=0;
}

void Open(void)
{
    T3CON=0x8010;            //1:8 prescale timer
    PR3=40000;               //Timer Interrupt Compare value for T = 20ms
    
    OC1R=OC1RS=1600;         //Horizontal position, 4% Duty Cycle (1600/40000)
    OC1CON=0x000E;           //Continue in Idle, Select Timer 3, PWM Mode 
    
    _T3IF=0;                 //Start with IF Cleared
    _T3IE=1;                 //Enable Timer 3 Interrupt
    
    while (1)
    {
        
        if (k>=1)            //Change motor position every 2 periods (50 times)
        {
            OC1RS=OC1RS+12;  //Increase duty cycle for PWM to change position
            if (OC1RS>=2900) //Vertical position, 7% Duty Cycle (2800/40000)
            {
                return 1;    //Stop once the lid is open
            }
            k=0;             // Reset Increment once above 2 periods
        }
      
    }
}

void Close(void)
{
    T3CON=0x8010;            //1:8 prescale timer
    PR3=40000;               //Timer Interrupt Compare value for T = 20ms
    
    OC1R=OC1RS=2900;         //Horizontal position, 4% Duty Cycle (1600/40000)
    OC1CON=0x000E;           //Continue in Idle, Select Timer 3, PWM Mode 
    
    _T3IF=0;                 //Start with IF Cleared
    _T3IE=1;                 //Enable Timer 3 Interrupt
    
    while (1)
    {
        
        if (k>=1)            //Change motor position every 2 periods (50 times)
        {
            OC1RS=OC1RS-12;  //Increase duty cycle for PWM to change position
            if (OC1RS<=1600) //Vertical position, 7% Duty Cycle (2800/40000)
            {
                return 1;    //Stop once the lid is open
            }
            k=0;             // Reset Increment once above 2 periods
        }
      
    }
}

bool checkDogID(int ID)
{
    if(ID == 1)
    {
        return true;
    }
    else
    {
        return false;
    }
}

bool checkTime(time_t time)
{
    if(time == time(NULL))
    {
        return true;
    }
    else
    {
        return false;
    }
}

bool checkLidStatus()
{
    if(OC1RS == 1600)
    {
        return true;
    }
    else
    {
        return false;
    }
}

int main(void)
{
    SYSTEM_Initialize();
    
    if(checkDogID(1) && checkTime(time(NULL)) && checkLidStatus())
    {
        Open();
    }
    else
    {
        Close();
    }

    return 1;
}
