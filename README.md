#unfold

======================

**[Unfold](http://karenpeng.github.io/unfold/)** is a website that takes any input recursive function and unveils the stack by animating their layers one by one.
V8 engine callsite is used to get recursive layers. Also the input code is manipulated as a string in some wacky ways :ghost:

=======================

####Feb 16
- Default function is used
- Editors pass real time input to analyser
- Get back recursive stack data from callsite
- Users need to **open console** to see

TO DO: find a way to animate the data

####Feb 24
- User could input function in the editor
- Animation implemented
- Animation updates immediately according to input

TO DO: it looks boring now, should i make it more boring(showing how dumb the computer is) / or should i make it interesting?

####Mar3
- **Migrate**to another [repo](http://github.com/karenpeng/inception), trying to use three js with first personal view roller coaster like methaphor for recursive layers
- Graphic working

TO DO: work on flow control
