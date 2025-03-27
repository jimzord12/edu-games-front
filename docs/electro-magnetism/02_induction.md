---
title: 'Electromagnetic Induction'
sidebar_label: 'Electromagnetic Induction'
sidebar_position: 2
---

import Youtube from '@site/src/components/Youtube';

# Electromagnetic Induction ⚡

Electromagnetic induction is the process by which a changing magnetic field induces an electromotive force (EMF) or current in a conductor.

## 🧲 Faraday's Law of Induction

The **Faraday’s Law of Electromagnetic Induction** states:

> _The induced EMF in a closed circuit is proportional to the rate of change of the magnetic flux through the circuit._

Mathematically, it is expressed as:

$$
\mathcal{E} = -\frac{d\Phi_B}{dt}
$$

Where:

- $ \mathcal{E} $ is the induced electromotive force (EMF) in volts (V),
- $ \Phi_B $ is the magnetic flux (measured in Weber, Wb),
- $ t $ is time (in seconds),
- The negative sign (Lenz’s Law) indicates that the induced EMF opposes the change in magnetic flux.

### Magnetic Flux ($ \Phi_B $)

Magnetic flux is defined as:

$$
\Phi_B = B \cdot A \cdot \cos(\theta)
$$

Where:

- $ B $ is the magnetic field strength (Tesla, T),
- $ A $ is the area of the loop (m²),
- $ \theta $ is the angle between the field and the normal to the loop.

<Youtube videoId="pQp6bmJPU_0" />

## 🔄 Understanding Magnetic Flux

1. **When the field is perpendicular to the surface** ($ \theta = 0^\circ $):

   - The flux is **maximum**:
   - $$ \Phi_B = B \cdot A $$

2. **When the field is parallel to the surface** ($ \theta = 90^\circ $):

   - No flux passes through.
   - $$ \Phi_B = 0 $$

3. **If the surface is tilted** at an angle, only a portion of the field passes through, reducing the flux.

<Youtube videoId="6T7aG3Gd_38" />

🎯 **Simple Analogy with wind 💨**

Think of magnetic flux like **wind blowing through a window**:

- If the wind (magnetic field) blows **straight through**, maximum air (flux) enters.
- If it blows **at an angle**, less air (flux) enters.
- If it blows **parallel** to the window, no air (flux) enters.

## ⚡ Lenz's Law: Direction of Induced EMF

Lenz’s Law states:

> _The direction of the induced current is such that it opposes the change in magnetic flux that produced it._

Simply put, Lezz's Law answers the question: **"What direction does the induced current flow?"**

- If the magnetic field **increases**, the induced current flows in a direction to **oppose** that increase.

### 🔄 Right-Hand Rule for Induced Current

To determine the **direction** of induced current:

1. Point your **thumb** in the direction of the magnetic field ($ B $).
2. Curl your **fingers** in the direction of the motion.
3. Your **palm** points in the direction of the induced current.

<Youtube videoId="3HyORmBip-w?start=276" />

## 🔋 Applications of Electromagnetic Induction

1️⃣ **Electric Generators**

An electric generator converts **mechanical energy** into **electrical energy** by rotating a coil within a magnetic field.

2️⃣ **Transformers**

A transformer works on the principle of electromagnetic induction to step up or step down voltage levels using two coils (primary and secondary).

3️⃣ **Induction Motors**

Induction motors operate by inducing a current in the rotor without direct electrical contact, using a rotating magnetic field.

<Youtube videoId="nllCgjlWAF4?start=147" />
