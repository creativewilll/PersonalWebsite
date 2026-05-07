Querying perplexity using sonar-pro for: AWS Trainium3 chip specifications performance AI training inference 2024 with maxTokens: 8000
### AWS Trainium3 Chip Specifications

AWS Trainium3 is the fourth-generation AI accelerator chip from AWS, built on TSMC's 3nm process and announced at re:Invent 2025 (available in EC2 Trn3 UltraServers). It's optimized for training and inference of trillion-parameter models, including agentic, reasoning, multimodal, and video generation workloads. It supports advanced data types like MXFP8, MXFP4, BF16, FP16, TF32, and sparse formats, with Logical NeuronCore Configuration (LNC) for flexible resource pooling.

#### Key Per-Chip Specifications
| Category          | Specification                                                                 |
|-------------------|-------------------------------------------------------------------------------|
| **Process Node** | TSMC 3nm                                                                      |
| **Compute Cores**| 8 NeuronCore-v4 cores                                                        |
| **Compute Performance** | - 2.52 PFLOPs (2,517 TFLOPS) MXFP8/MXFP4<br>- 671 TFLOPS BF16/FP16/TF32<br>- 2,517 TFLOPS FP16/BF16/TF32 sparse<br>- 183 TFLOPS FP32 |
| **Memory**       | 144 GB HBM3e (12-high stacks, 4 stacks)                                       |
| **Memory Bandwidth** | 4.9 TB/s (1.7x over Trainium2, via 9.6 Gbps pin speeds)                     |
| **Data Movement**| 4.9 TB/s DMA bandwidth with inline computation                                |
| **Interconnect** | - NeuronLink-v4: 2.56 TB/s device-to-device<br>- PCIe Gen6: 1.2 TB/s unidirectional scale-up (144 active lanes)<br>- Scale-out: Up to 200 Gbps per chip (e.g., via Nitro-v6 400G NIC shared across 2 chips) |

#### Performance Highlights
- **vs. Trainium2**: 2x compute (FP8), 1.5x memory capacity, 1.7x memory bandwidth; Trn3 UltraServers show 4.4x performance, 3.9x bandwidth, 4x energy efficiency.
- **Training**: Up to 4x lower latency; excels in dense/expert-parallel workloads with <10μs inter-chip communication via Neuron Fabric/Switch-v1 (doubles bandwidth over Trn2).
- **Inference**: On Amazon Bedrock, up to 3x faster than Trainium2; >5x higher output tokens per megawatt at similar user latency. Handles real-time serving with KV cache overlap (200 Gbps scale-out sufficient for largest models).
- **Energy Efficiency**: 5x more tokens/MW than prior generations; 50% cost reduction vs. GPU alternatives in production (e.g., Anthropic, Decart workloads).
- **Scaling**: 
  | Configuration       | Total Compute (FP8) | Total Memory | Total Bandwidth |
  |---------------------|---------------------|--------------|-----------------|
  | **Single Chip**    | 2.52 PFLOPs        | 144 GB      | 4.9 TB/s       |
  | **Trn3 UltraServer (144 chips)** | 362 PFLOPs (362 MXFP8) | 20.7 TB     | 706 TB/s       |

  Scales to EC2 UltraClusters 3.0 (hundreds of thousands of chips) with NeuronSwitch-v1 all-to-all fabric.

Trainium3 prioritizes token economics over raw FLOPs, enabling larger batch sizes, extended contexts, and sustainable AI at scale. For latest pricing/availability, check AWS EC2 Trn3 instances. Trainium4 is slated for late 2026/early 2027 with NVLink Fusion support.