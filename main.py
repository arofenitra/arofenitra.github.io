import tkinter as tk
import numpy as np
import scipy as sp
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg,NavigationToolbar2Tk
from matplotlib.figure import Figure

class GraphingCalculator:
    def __init__(self, master):
        self.master = master
        self.master.title("Graphing Calculator")
        self.master.geometry("500x800+0+0") #size of the app
        master.resizable(False,False)
        self.master.config(bg="white") #Background color of the app
        self.label = tk.Label(master, text="Enter a function:")
        self.label.pack()

        self.entry = tk.Entry(master)
        self.entry.pack()

        self.plot_button = tk.Button(master, text="Plot", command=self.plot)
        self.plot_button.pack()

        self.fig = Figure(figsize=(5, 4), dpi=100)
        self.canvas = FigureCanvasTkAgg(self.fig, master=master)  
        self.canvas.get_tk_widget().pack()
        
        #Button
        self.button1=tk.Button(width=5,height=2,text="(",relief="flat",bg="#aaa",command=lambda:self.show("(")).place(x=0,y=450)
        self.button2=tk.Button(width=5,height=2,text=")",relief="flat",bg="#aaa",command=lambda:self.show(")")).place(x=50,y=450)
        self.button3=tk.Button(width=5,height=2,text="C",relief="flat",bg="#aaa",command=lambda:self.clear()).place(x=0,y=700)
        self.button4=tk.Button(width=5,height=2,text="1",relief="flat",bg="#aaa",command=lambda:self.show(1)).place(x=0,y=650)
        self.button5=tk.Button(width=5,height=2,text="2",relief="flat",bg="#aaa",command=lambda:self.show(2)).place(x=50,y=650)
        self.button6=tk.Button(width=5,height=2,text="3",relief="flat",bg="#aaa",command=lambda:self.show(3)).place(x=100,y=650)
        self.button7=tk.Button(width=5,height=2,text="4",relief="flat",bg="#aaa",command=lambda:self.show(4)).place(x=0,y=600)
        self.button8=tk.Button(width=5,height=2,text="5",relief="flat",bg="#aaa",command=lambda:self.show(5)).place(x=50,y=600)
        self.button9=tk.Button(width=5,height=2,text="6",relief="flat",bg="#aaa",command=lambda:self.show(6)).place(x=100,y=600)
        self.button10=tk.Button(width=5,height=2,text="7",relief="flat",bg="#aaa",command=lambda:self.show(7)).place(x=0,y=550)
        self.button11=tk.Button(width=5,height=2,text="8",relief="flat",bg="#aaa",command=lambda:self.show(8)).place(x=50,y=550)
        self.button12=tk.Button(width=5,height=2,text="9",relief="flat",bg="#aaa",command=lambda:self.show(9)).place(x=100,y=550)
        self.button13=tk.Button(width=5,height=2,text="0",relief="flat",bg="#aaa",command=lambda:self.show(0)).place(x=50,y=700)
        self.button14=tk.Button(width=5,height=2,text=".",relief="flat",bg="#aaa",command=lambda:self.show(".")).place(x=100,y=700)
        self.button15=tk.Button(width=5,height=2,text="+",relief="flat",bg="#aaa",command=lambda:self.show("+")).place(x=150,y=700)
        self.button16=tk.Button(width=5,height=2,text="-",relief="flat",bg="#aaa",command=lambda:self.show("-")).place(x=150,y=650)
        self.button17=tk.Button(width=5,height=2,text="*",relief="flat",bg="#aaa",command=lambda:self.show("*")).place(x=150,y=600)
        self.button18=tk.Button(width=5,height=2,text="/",relief="flat",bg="#aaa",command=lambda:self.show("/")).place(x=150,y=550)
        self.button19=tk.Button(width=5,height=2,text="%",relief="flat",bg="#aaa",command=lambda:self.show("%")).place(x=150,y=500)   
        
        self.button20=tk.Button(width=5,height=2, text="cos", relief="flat", bg="#aaa", command=lambda: self.show("np.cos(")).place(x=200, y=500)
        self.button21=tk.Button(width=5,height=2, text="sin", relief="flat", bg="#aaa", command=lambda: self.show("np.sin(")).place(x=200, y=450)
        self.button22=tk.Button(width=5,height=2, text="tan", relief="flat", bg="#aaa", command=lambda: self.show("np.tan(")).place(x=200, y=550)
        self.button22=tk.Button(width=5,height=2, text="e^", relief="flat", bg="#aaa", command=lambda: self.show("np.exp(")).place(x=100, y=500)
        self.button24=tk.Button(width=5,height=2, text="pi", relief="flat", bg="#aaa", command=lambda: self.show("np.pi")).place(x=100,y=450)
        self.button25=tk.Button(width=5,height=2, text="cosh", relief="flat", bg="#aaa", command=lambda: self.show("np.cosh(")).place(x=200, y=650)
        self.button26=tk.Button(width=5,height=2, text="sinh", relief="flat", bg="#aaa", command=lambda: self.show("np.sinh(")).place(x=200, y=600)
        self.button27=tk.Button(width=5,height=2, text="tanh", relief="flat", bg="#aaa", command=lambda: self.show("np.tanh(")).place(x=200, y=700)
        self.button28=tk.Button(width=5,height=2, text="^", relief="flat", bg="#aaa", command=lambda: self.show("np.pow()")).place(x=150, y=450)
        self.button29=tk.Button(width=5,height=2, text="x", relief="flat", bg="#aaa", command=lambda: self.show("x")).place(x=0, y=500)
        self.button30=tk.Button(width=5,height=2, text="θ", relief="flat", bg="#aaa", command=lambda: self.show("θ")).place(x=50, y=500)
        
        

        
    def calculate_trig(self,func,value):
        return func(np.radians(value))
    
    def show(self,value):
        self.entry.insert(tk.END, value)
    
    def clear(self):
        self.entry.delete(0, tk.END)
    def plot(self):
        self.fig.clear()
        function = self.entry.get()
        x = np.linspace(-20, 20, 1000)
        
        try:
        # Try to convert the function to a float
            y = float(function)
        # If successful, create an array of that number with the same shape as x
            y = np.full_like(x, y)
        except ValueError:
        # If not successful, evaluate the function as before
            y = eval(function)
        ax = self.fig.add_subplot(111)
        ax.set_xlim([-2, 2])
        ax.set_ylim([-2,2])
        ax.plot(x, y)
        self.canvas.draw()


root = tk.Tk()
app = GraphingCalculator(root)

root.mainloop()
