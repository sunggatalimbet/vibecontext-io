// const handleGenerateProjectSummary = async () => {
//     setIsGeneratingProject(true)

//     try {
//       // Step 1: Generate AI summary from conversation history using the same LLM service
//       const summaryResponse = await fetch('/api/chat/summarize-idea', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })

//       if (!summaryResponse.ok) {
//         const errorData = (await summaryResponse.json()) as { error?: string }
//         throw new Error(errorData.error || 'Failed to generate summary')
//       }

//       const summaryData = (await summaryResponse.json()) as { summary: string }

//       // Parse the JSON summary
//       let appIdeaSummary: IAppIdeaSummary
//       try {
//         // The AI should return a JSON string, so we need to parse it
//         appIdeaSummary = JSON.parse(summaryData.summary) as IAppIdeaSummary
//       } catch (parseError) {
//         console.error('Failed to parse AI summary:', parseError)
//         throw new Error(
//           'Failed to parse the generated summary. Please try again.'
//         )
//       }

//       // Step 2: Create project with the summary
//       const projectResponse = await fetch('/api/projects', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ appIdeaSummary }),
//       })

//       if (!projectResponse.ok) {
//         const errorData = (await projectResponse.json()) as { error?: string }
//         throw new Error(errorData.error || 'Failed to create project')
//       }

//       const projectData = (await projectResponse.json()) as {
//         success: true
//         project: { id: string; name: string; createdAt: string }
//       }

//       // Set project created state
//       setProjectCreated({
//         id: projectData.project.id,
//         name: projectData.project.name,
//       })

//       // Clear chat memory after successful project creation
//       await fetch('/api/chat/generate-idea', {
//         method: 'DELETE',
//       })
//     } catch (error) {
//       console.error('Error generating project:', error)

//       // Add error message to chat
//       const errorMessage = {
//         id: Date.now(),
//         content: `Error creating project: ${error instanceof Error ? error.message : 'Unknown error'}`,
//         sender: 'ai' as const,
//       }
//       setMessages(prev => [...prev, errorMessage])
//     } finally {
//       setIsGeneratingProject(false)
//     }
//   }
