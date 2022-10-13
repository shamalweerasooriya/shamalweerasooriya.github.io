---
layout: page
title: FPGA Processor Customization for CRC
description: Adding a custom instruction to the existing MIPS ISA of the NiosII processor of Altera Cyclone IV FPGA board, for performing the modulo-2 division, to enhance operation of CRC algorithm
img: assets/img/fpga-1.jpeg
importance: 1
category: university
---

*Hardware tools used: FPGA Development Board Altera CycloneIV* <br>
*Software tools used: Quartus II, Nios II Software Build Tools, C, Verilog*

Cyclic Redundancy Check is a very powerful and widely used error detection method. It has the capability of detecting burst errors unlike the single bit error checks. It mainly requires the modulo 2 division operation. CRC uses a generator polynomial which is used to divide the data word to be sent. The generator is available at both sending and receiving side. Suppose the data word to be sent is 100100 and generator polynomial is $$ x^3 + x^2 + 1 $$ (which sets the key as 1101). Initially the data is appended by the maximum degree of polynomial with 0’s. Then it’s divided by the generator polynomial and the obtained remainder is appended to the data to be sent and transferred to the receiver.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/crc.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption" style="text-align: left">
    Calculating the remainder
</div>

The actual data is appended with the above obtained remainder. So the data sent to the receiver is 100100**001**.
The received data is then divided by the generator polynomial at the receiving end and if the remainder is 0 there are no errors in data. As demonstrated above, the CRC algorithms requires **XOR and shift operations**. The proposed solution was to add a custom instruction to the existing MIPS ISA of the NiosII processor, for performing the modulo-2 division, to enhance operation of CRC (Cyclic Redundancy Check) algorithm. The proceding steps were:

##### Adding a Custom Instruction to the NiosII Processor

The top level diagram for the project was created on Quartus software. The only exported terminals from the SoC are clock and reset inputs. The SoC was generated using the Qsys tool.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/crc_1.png" title="example image" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/crc_2.png" title="example image" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Select the image to view in full size
</div>

The custom instruction component was built and added by following the steps in the Nios II Custom Instruction User Guide (page 18 - 28) using the QSys tool in Quartus II.

First the name and display name was set.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/crc-3.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Then the synthesis verilog files were uploaded and analyzed.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/crc-4.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Next the proper interface settings were configured to make it a custom instruction for the NiosII processor. A proper name was set and the type was set to Custom Instruction Slave. Clock cycle type was set to Variable and the operands was set to 1.
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/crc-5.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Finally proper signal types were set at the component editor (of QSys Tool).

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/crc-6.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

After adding the created component to Qsys system contents the Customer Instruction Master signal was connected to CRC_CUSTOM component’s Custom Instruction Slave terminal. The SoC was generated and the SoC was added to the TopLevel.bdf. The Proper connections were done. Then the essential steps like, Analysis & Elaboration, pin assignment were performed. Finally it was compiled and uploaded to the FPGA board.

##### Comparison of Custom Instruction with Software Implementations

Final step was to compare and contrast the custom instruction we added with a software implementation of CRC. The source codes used for the software implementation are available <a href="#">here</a> soon. It was built and uploaded using NIOS II software build tool. The final results were as follows.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/crc-7.png" title="example image" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

According to the outputs by comparing on processing time,

The custom instruction CRC gives the best processing time of 1ms, while optimised software CRC has the second best of 6ms. Compared to both software implementations, the custom instructions seems to be the better choice under processing time.
Comparing on processing throughput,

The custom instruction CRC has the best throughput which is 2048Mbps. The throughput of software CRC is higher than the optimised software CRC, but still the custom instruction CRC remains at the top.

By going through the speed up ratio, custom instruction has 77 times increased speed compared to software CRC and 52 times increased speed compared to optimised software CRC. The two software implementations seems to have equal speedups.

As the above facts demonstrate, **the newly added custom instruction in the CRC algorithm has better perfomance** in every aspect compared to the pure software implementations.